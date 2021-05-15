import axios from "axios";
import { CryptoInfo } from "../crypto";
import { getCryptoIndicatorMetrics, Indicator } from "../utils";

export type RedditPostsResponse = {
  data: {
    children: {
      is_video: boolean;
      data: { distinguished: boolean; selftext: string; url: string };
    }[];
  };
};

export type RedditCommentsResponse = {
  data: {
    children: {
      data: { body?: string };
    }[];
  };
}[];

export const getSubRedditIndicators = async (
  subReddit: string,
  cryptoInfo: CryptoInfo[]
): Promise<Indicator[]> => {
  const targetURL = `https://reddit.com/r/${subReddit}.json?sort=hot&t=week`;
  let {
    data: {
      data: { children },
    },
  } = await axios.get<RedditPostsResponse>(targetURL);

  children = children.filter((child) => !child.data.distinguished);
  children = children.filter((child) => !child.is_video);
  children = children.filter((child) =>
    cryptoInfo.some(
      ({ name, symbol }) =>
        child.data.selftext.includes(name) ||
        child.data.selftext.includes(symbol)
    )
  );

  const postIndicators = await Promise.all(
    children.map(async ({ data: { selftext, url } }) => {
      const { data } = await axios.get<RedditCommentsResponse>(
        `${url.substring(0, url.length - 1)}.json`
      );
      const inputStrings: string[] = [];

      const comments = data[1].data.children
        .filter(({ data: { body } }) => !!body)
        .map(({ data: { body } }) => body);
      inputStrings.push(selftext, ...comments);

      const cryptoIndicatorMetrics = cryptoInfo.map(({ symbol, name }) =>
        getCryptoIndicatorMetrics(inputStrings, symbol, name)
      );
      return cryptoIndicatorMetrics.filter(
        (cryptoIndicatorMetric) => cryptoIndicatorMetric
      );
    })
  );

  const indicators: Indicator[] = [];
  postIndicators.forEach((i: []) => indicators.push(...i));

  return indicators;
};
