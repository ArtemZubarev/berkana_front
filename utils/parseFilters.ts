const qs = require("qs");

const parseFilters = (str: string) => {
  return qs.parse(str);
};
