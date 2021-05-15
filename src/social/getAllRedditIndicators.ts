import { getSubRedditIndicators } from ".";
import { CryptoInfo } from "../crypto";
import { Indicator } from "../utils";

export const getAllRedditIndicators = async (
  cryptoInfo: CryptoInfo[]
): Promise<Indicator[]> => {
  const subReddits = ["CryptoCurrency"];
  const indicators: Indicator[] = [];

  await Promise.all(
    subReddits.map(async (subReddit) => {
      const subRedditIndicators = await getSubRedditIndicators(
        subReddit,
        cryptoInfo
      );
      indicators.push(...subRedditIndicators);
    })
  );
  return indicators;
};
