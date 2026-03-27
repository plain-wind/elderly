import type { LocationQuery, LocationQueryValue, RouteLocationNormalized } from 'vue-router';

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

type QueryParser<T> = (value: string | undefined) => T;

const normalizeQueryValue = (value: LocationQueryValue | LocationQueryValue[] | undefined): string | undefined => {
  const single = Array.isArray(value) ? value[0] : value;
  return single ?? undefined;
};

const parseRouteQuery = <T extends Record<string, QueryParser<any>>>(
  query: LocationQuery,
  schema: T,
): { [K in keyof T]: ReturnType<T[K]> } => {
  const result = {} as { [K in keyof T]: ReturnType<T[K]> };

  for (const key of Object.keys(schema) as Array<keyof T>) {
    const parser = schema[key];
    result[key] = parser(normalizeQueryValue(query[key as string]));
  }

  return result;
};

const asString = (fallback = ''): QueryParser<string> => {
  return (value) => value ?? fallback;
};

const asNumber = (fallback = Number.NaN): QueryParser<number> => {
  return (value) => {
    if (value == null || value === '') {
      return fallback;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  };
};

const asBoolean = (fallback = false): QueryParser<boolean> => {
  return (value) => {
    if (value == null) {
      return fallback;
    }

    return value === 'true' || value === '1';
  };
};


export { isTopLevelChange, validateTelephone, parseRouteQuery, asString, asNumber, asBoolean };