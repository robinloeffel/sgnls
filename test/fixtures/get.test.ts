import { expect, suite, test } from "vitest";
import signal from "../../dist";

suite("initializing and getting values", () => {
	test("can initialize a string", () => {
		const $signal = signal("test");
		expect($signal.get()).toStrictEqual("test");
	});

	test("can initialize an object", () => {
		const $signal = signal({ a: "", b: 2, c: true });
		expect($signal.get()).toStrictEqual({ a: "", b: 2, c: true });
	});
});
