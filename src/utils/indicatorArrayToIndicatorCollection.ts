import { IndicatorCollection, Indicator } from ".";

export const indicatorArrayToIndicatorCollection = (
  indicators: Indicator[]
): IndicatorCollection => {
  const indicatorCollection: IndicatorCollection = {};
  indicators.forEach((indicator) => {
    if (indicatorCollection[indicator.name]) {
      indicatorCollection[indicator.name].mentions += indicator.mentions;
      indicatorCollection[indicator.name].buy += indicator.buy;
      indicatorCollection[indicator.name].sell += indicator.sell;
      indicatorCollection[indicator.name].hold += indicator.hold;
    } else {
      indicatorCollection[indicator.name] = indicator;
    }
  });
  return indicatorCollection;
};
