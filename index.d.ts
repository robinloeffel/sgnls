declare const _default: <T>(initialValue: T) => {
    get: () => T;
    set: (newValue: T) => void;
    update: (updater: (oldValue: T) => T) => void;
    effect: (effectToAdd: (newValue: T) => void) => void;
    stop: () => void;
};
export default _default;
