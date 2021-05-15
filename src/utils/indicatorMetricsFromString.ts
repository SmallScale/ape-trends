import { IndicatorMetrics, escapeRegExpVariable } from "./";
import common from "common-words";

export const indicatorMetricsFromString = (
  string: string,
  symbol: string,
  name: string
): IndicatorMetrics => {
  const symbolMentions = !common.some(
    (commonWord) => commonWord.word === symbol
  )
    ? string.match(new RegExp(`^${escapeRegExpVariable(symbol)}`, "gi"))
        ?.length ?? 0
    : 0;
  return {
    mentions:
      symbolMentions +
      (string.match(new RegExp(`${escapeRegExpVariable(name)}`, "gi"))
        ?.length ?? 0),
    buy: string.match(/buy/gi)?.length ?? 0,
    sell: string.match(/sell/gi)?.length ?? 0,
    hold: string.match(/hold/gi)?.length ?? 0,
  };
};
