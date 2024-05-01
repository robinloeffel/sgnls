type Effect<T> = (newValue: T) => void;
type Updater<T> = (oldValue: T) => T;

const signal = <T>(initialValue: T) => {
	let currentValue = initialValue;
	let invokingEffects = false;
	let effects: Effect<T>[] = [];

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
		set: (newValue: T) => {
			if (newValue !== currentValue) {
				currentValue = newValue;
				invokeEffects();
			}
		},
		update: (updater: Updater<T>) => {
			if (updater(currentValue) !== currentValue) {
				currentValue = updater(currentValue);
				invokeEffects();
			}
		},
		effect: (effectToAdd: Effect<T>) => {
			effects = [ ...effects, effectToAdd ];
			invokeEffects();
		},
		stop: () => {
			globalThis.queueMicrotask(() => {
				effects = [];
			});
		}
	};
};

export default signal;
