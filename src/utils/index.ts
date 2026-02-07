import type { RouteLocationNormalized } from 'vue-router';

const isTopLevelChange = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  return to.matched[0] !== from.matched[0];
};


export { isTopLevelChange };