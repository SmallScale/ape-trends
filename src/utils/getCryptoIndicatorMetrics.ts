import { indicatorMetricsFromString, Indicator } from ".";

export const getCryptoIndicatorMetrics = (
  inputStrings: string[],
  symbol: string,
  name: string
): Indicator | undefined => {
  const commentIndicators = inputStrings.map((string) => {
    return indicatorMetricsFromString(string, symbol, name);
  });
  let mentions: number = 0;
  let buy: number = 0;
  let sell: number = 0;
  let hold: number = 0;

  commentIndicators.forEach((indicator) => {
    mentions += indicator.mentions;
    buy += indicator.buy;
    sell += indicator.sell;
    hold += indicator.hold;
  });

  return mentions > 0
    ? {
        symbol,
        name,
        mentions,
        buy,
        sell,
        hold,
      }
    : undefined;
};
