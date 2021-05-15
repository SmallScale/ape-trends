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

export type Depth = "25%" | "50%" | "100%";

export type Limits = {
  depth: "25%" | "50%" | "100%";
};

export const depthToNumber = (depth: Depth): number => {
  switch (depth) {
    case "100%":
      return 1;
    case "50%":
      return 0.5;
    case "25%":
      return 0.25;
  }
};
