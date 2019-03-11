export const numberWithCommas = x => {
  const temp = x.split(',').join('');
  return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const reapeat = (n, callback) => new Array(n).fill(null).map(callback);
