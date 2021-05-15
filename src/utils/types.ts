export type IndicatorMetrics = {
  mentions: number;
  buy: number;
  sell: number;
  hold: number;
};

export type Indicator = {
  symbol: string;
  name: string;
} & IndicatorMetrics;

export type IndicatorCollection = {
  [key: string]: Indicator;
};
