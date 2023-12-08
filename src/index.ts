export default <T>(initialValue: T) => {
	type Effect = (newValue: T) => void;
	type Updater = (oldValue: T) => T;

	let currentValue = initialValue;
	let invokingEffects = false;
	let effects: Effect[] = [];

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
		update: (updater: Updater) => {
			if (updater(currentValue) !== currentValue) {
				currentValue = updater(currentValue);
				invokeEffects();
			}
		},
		effect: (effectToAdd: Effect) => {
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
