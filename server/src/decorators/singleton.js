export const SINGLETON_KEY = Symbol();

const singleton = (cl) =>
  new Proxy(cl, {
    construct(target, argsList, newTarget) {
      if (target.prototype !== newTarget.prototype) {
        return Reflect.construct(target, argsList, newTarget);
      }

      if (!target[SINGLETON_KEY]) {
        target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
      }

      return target[SINGLETON_KEY];
    },
  });

export default singleton;
