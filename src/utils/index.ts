import type { RouteLocationNormalized } from 'vue-router';

const isTopLevelChange = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  return to.matched[0] !== from.matched[0];
};

const validateTelephone = (rule: any, value: string, callback: any) => {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的手机号码'));
  }
};


export { isTopLevelChange, validateTelephone };