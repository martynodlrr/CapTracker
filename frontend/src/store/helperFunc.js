const normalizeData = (arr) => {
  const obj = {};
  if (arr) {
    if (!arr.length) return {};
    for (let el of arr) {
      obj[el.id] = el;
    }
  }
  return obj;
};

export default normalizeData;
