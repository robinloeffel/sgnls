export default (initialValue) => {
    let currentValue = initialValue;
    let invokingEffects = false;
    let effects = [];
    const invokeEffects = () => {
        if (effects.length > 0 && !invokingEffects) {
            invokingEffects = true;
            globalThis.queueMicrotask(() => {
                for (const effect of effects) {
                    effect(currentValue);
                }
                invokingEffects = false;
            });
        }
    };
    return {
        get: () => currentValue,
        set: (newValue) => {
            if (newValue !== currentValue) {
                currentValue = newValue;
                invokeEffects();
            }
        },
        update: (updater) => {
            if (updater(currentValue) !== currentValue) {
                currentValue = updater(currentValue);
                invokeEffects();
            }
        },
        effect: (effectToAdd) => {
            effects = [...effects, effectToAdd];
            invokeEffects();
        },
        stop: () => {
            globalThis.queueMicrotask(() => {
                effects = [];
            });
        }
    };
};
