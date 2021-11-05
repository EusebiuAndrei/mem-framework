export const modifyDeep = (object: any, cb: (key: any, value: any) => any) => {
  if (!(object instanceof Object)) {
    return;
  }

  for (const [key, value] of Object.entries(object)) {
    if (value instanceof Array || value instanceof Object) {
      modifyDeep(value, cb);
    } else {
      object[key] = cb(key, value);
    }
  }
};

export const traverseDeep = (object: any, cb: (key: any, value: any) => any) => {
  if (!(object instanceof Object)) {
    return;
  }

  for (const [key, value] of Object.entries(object)) {
    if (value instanceof Array || value instanceof Object) {
      traverseDeep(value, cb);
    } else {
      cb(key, value);
    }
  }
};
