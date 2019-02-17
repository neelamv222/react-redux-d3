
export const isNumber = (value) => {
  const patt = new RegExp("^\\d+$");
  return !patt.test(value);
};
