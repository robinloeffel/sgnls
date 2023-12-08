export default (initialValue) => {
    let value = initialValue;
    let alerting = false;
    let listeners = [];
    const nod = () => {
        if (listeners.length > 0 && !alerting) {
            alerting = true;
            window.queueMicrotask(() => {
                for (const listener of listeners) {
                    listener(value);
                }
                alerting = false;
            });
        }
    };
    return {
        get: () => value,
        set: (newValue) => {
            if (newValue !== value) {
                value = newValue;
                nod();
            }
        },
        effect: (listener) => {
            listeners = [...listeners, listener];
            nod();
        },
        stop: () => {
            window.queueMicrotask(() => {
                listeners = [];
            });
        }
    };
};
