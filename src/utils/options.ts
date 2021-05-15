import { Limits } from "./";

export type Options = {
  limits?: Limits;
};

let options: Options;

export const getOptions = (): Options | undefined => options;

export const setOptions = (newOptions: Options): void => {
  options = newOptions;
};
