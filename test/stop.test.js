import { describe, it } from "node:test";
import { strictEqual } from "node:assert";

import signal from "../dist/index.js";

describe("stop invoking effects when a signal changes", () => {
	it("stops invoking an effect", () => {
		const $signal = signal("test");
		let count = 0;

		$signal.effect(() => {
			count += 1;
		});

		globalThis.setTimeout(() => {
			$signal.set("new test");
		}, 500);

		globalThis.setTimeout(() => {
			$signal.stop();
			$signal.set("new test 2");
		}, 1000);

		globalThis.setTimeout(() => {
			strictEqual(count, 2);
		}, 1500);
	});

	it("stops invoking multiple effect", () => {
		const $signal = signal("test");
		let count = 0;

		$signal.effect(() => {
			count += 1;
		});

		$signal.effect(() => {
			count += 1;
		});

		globalThis.setTimeout(() => {
			$signal.set("new test");
		}, 500);

		globalThis.setTimeout(() => {
			$signal.stop();
			$signal.set("new test 2");
		}, 1000);

		globalThis.setTimeout(() => {
			strictEqual(count, 4);
		}, 1500);
	});
});
