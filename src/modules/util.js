export const numberWithCommas = x => {
  const temp = x.split(',').join('');
  return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const reapeat = (n, callback) => new Array(n).fill(null).map(callback);

export const filterList = (list, pivot, keyword) => list.filter(el => {
  console.log(keyword, el);
  const index = el[pivot].indexOf(keyword);
  return index >= 0;
});
