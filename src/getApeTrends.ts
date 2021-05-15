import { CryptoInfo, listAllCrypto } from "./crypto";
import { getAllRedditIndicators } from "./social";
import {
  Indicator,
  indicatorArrayToIndicatorCollection,
  IndicatorCollection,
  Limits,
  setOptions,
} from "./utils";

export type Source = "Reddit";

export type Options = {
  sourcesOverride?: Source[];
  cryptoInfoOverride?: CryptoInfo[];
  limits?: Limits;
};

/**
 * Queries different social media sources to obtain indicators for crypto currencies
 *
 * @param {Options} options - Function options.
 * @param {Source} options.sourcesOverride - Only query specified sources
 * @param {CryptoInfo[]?} [options.cryptoInfoOverride] - Only get indicators for specified crypto currencies
 *
 * @returns {Promise<IndicatorCollection>} Promise that resolves an object containing indicators for crypto currencies
 */
export const getApeTrends = async (
  options?: Options
): Promise<IndicatorCollection> => {
  setOptions({ limits: options?.limits });
  const sources: Source[] = options?.sourcesOverride ?? ["Reddit"];
  const cryptoInfo = options?.cryptoInfoOverride ?? (await listAllCrypto());

  if (sources.length === 0) {
    throw new Error("You need to specify at least one source");
  }

  if (cryptoInfo.length === 0) {
    throw new Error(
      "You need to specify at least one crypto currency to evaluate"
    );
  }

  const indicators: Indicator[] = [];

  if (sources.includes("Reddit")) {
    const redditIndicators = await getAllRedditIndicators(cryptoInfo);
    indicators.push(...redditIndicators);
  }

  return indicatorArrayToIndicatorCollection(indicators);
};
