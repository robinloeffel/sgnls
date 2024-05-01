import { expect, suite, test } from "vitest";
import signal from "../../dist";

suite("setting values", () => {
	test("can set a new string value", () => {
		const $signal = signal("test");
		$signal.set("new test");

		expect($signal.get()).toStrictEqual("new test");
	});

	test("can set a new object value", () => {
		const $signal = signal({ a: "", b: 2, c: true });
		$signal.set({ c: false, b: 2, a: "yup" });

		expect($signal.get()).toStrictEqual({ c: false, b: 2, a: "yup" });
	});
});
