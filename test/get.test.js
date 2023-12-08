import { describe, it } from "node:test";
import { strictEqual, deepStrictEqual } from "node:assert";

import signal from "../dist/index.js";

describe("initialize a signal and get its value", () => {
	it("can initialize (string)", () => {
		const $signal = signal("test");
		strictEqual($signal.get(), "test");
	});

	it("can initialize (object)", () => {
		const $signal = signal({ a: "", b: 2, c: true });
		deepStrictEqual($signal.get(), { a: "", b: 2, c: true });
	});
});
