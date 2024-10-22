const qs = require("qs");

const stringifyFilters = (obj: any) => {
  return qs.stringify(obj, {
    encodeValuesOnly: true, // prettify URL
  });
};

export default stringifyFilters;
