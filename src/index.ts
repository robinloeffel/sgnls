export default <T>(initialValue: T) => {
  type Listener = (changedValue: T) => void;

  let value = initialValue;
  let alerting = false;
  let listeners: Listener[] = [];

  const nod = () => {
    if (listeners.length > 0 && !alerting) {
      alerting = true;

      globalThis.queueMicrotask(() => {
        for (const listener of listeners) {
          listener(value);
        }

        alerting = false;
      });
    }
  };

  return {
    get: () => value,
    set: (newValue: T) => {
      if (newValue !== value) {
        value = newValue;
        nod();
      }
    },
    effect: (listener: Listener) => {
      listeners = [ ...listeners, listener ];
      nod();
    },
    stop: () => {
      globalThis.queueMicrotask(() => {
        listeners = [];
      });
    }
  };
};
