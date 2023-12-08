import { describe, it } from "node:test";
import { strictEqual, deepStrictEqual } from "node:assert";

import signal from "../dist/index.js";

describe("initialize a signal and set a new value", () => {
	it("can set a new value (string)", () => {
		const $signal = signal("test");
		$signal.set("new test");

		strictEqual($signal.get(), "new test");
	});

	it("can set a new value (object)", () => {
		const $signal = signal({ a: "", b: 2, c: true });
		$signal.set({ c: "", b: 2, a: true });

		deepStrictEqual($signal.get(), { c: "", b: 2, a: true });
	});
});
