import * as qs from "qs";

const parseFilters = (str: string) => {
  return qs.parse(str, { plainObjects: true });
};

export default parseFilters;
