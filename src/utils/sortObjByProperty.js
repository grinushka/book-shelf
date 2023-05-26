export const sortBy = function (obj, sortProp) {

  for (const property in obj) {
    if (obj[property].length > 1) {
      obj[property].sort((a, b) => {
        if (a[sortProp] < b[sortProp]) {
          return -1;
        }
        if (a[sortProp] > b[sortProp]) {
          return 1;
        }
        return 0;
      });
    }
  }
  
};
