import _ from 'lodash';

export const groupBy = function(obj, groupProp) {
  return _.chain(obj).groupBy(groupProp).value();
}
