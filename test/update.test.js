import { describe, it } from "node:test";
import { strictEqual, deepStrictEqual } from "node:assert";

import signal from "../dist/index.js";

describe("initialize a signal and update its value", () => {
	it("can update the signal's value (string)", () => {
		const $signal = signal("test");
		$signal.update(value => `${value}ing`);

		strictEqual($signal.get(), "testing");
	});

	it("can update the signal's value (object)", () => {
		const $signal = signal({ a: "", b: 2, c: true });
		$signal.update(value => ({ ...value, d: [] }));

		deepStrictEqual($signal.get(), { a: "", b: 2, c: true, d: [] });
	});
});
