export default <T>(initialValue: T) => {
	type Effect = (newValue: T) => void;

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
