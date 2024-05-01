/** function that gets executed when a signal changes */
type Effect<T> = (value: T) => void;

/** function that manipulates the value of a signal */
type Updater<T> = (oldValue: T) => T;

interface Signal<T> {

	/** return the current value of the signal */
	get: () => T;

	/** override the value of the signal */
	set: (newValue: T) => void;

	/** manipulate the value of the signal */
	update: (updater: Updater<T>) => void;

	/** add an effect to the signal */
	effect: (effectToAdd: Effect<T>) => void;

	/** remove all effects from the signal */
	stop: VoidFunction;
}

/** wrapper around queueMicrotask */
const tick = (callback: VoidFunction) => {
	globalThis.queueMicrotask(callback);
};

const signal = <SignalType>(initialValue: SignalType): Signal<SignalType> => {
	let currentValue = initialValue;
	let invokingEffects = false;
	let effects: Effect<SignalType>[] = [];

	const invokeEffects = () => {
		if (effects.length > 0 && !invokingEffects) {
			invokingEffects = true;

			tick(() => {
				for (const effect of effects) {
					effect(currentValue);
				}

				invokingEffects = false;
			});
		}
	};

	return {
		get: () => currentValue,
		set: (newValue: SignalType) => {
			if (newValue !== currentValue) {
				currentValue = newValue;
				invokeEffects();
			}
		},
		update: (updater: Updater<SignalType>) => {
			if (updater(currentValue) !== currentValue) {
				currentValue = updater(currentValue);
				invokeEffects();
			}
		},
		effect: (effectToAdd: Effect<SignalType>) => {
			effects.push(effectToAdd);
		},
		stop: () => {
			tick(() => {
				effects = [];
			});
		}
	};
};

export default signal;
