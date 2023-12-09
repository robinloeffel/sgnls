import { suite, test, expect } from "vitest";
import signal from "../../dist";

suite("initialize a signal and update its value", () => {
	test("can update the signal's value (string)", () => {
		const $signal = signal("test");
		$signal.update(value => `${value}ing`);

		expect($signal.get()).toStrictEqual("testing");
	});

	test("can update the signal's value (object)", () => {
		const $signal = signal({ a: "", b: 2, c: true });
		$signal.update(value => ({ ...value, d: [] }));

		expect($signal.get()).toStrictEqual({ a: "", b: 2, c: true, d: [] });
	});
});
