import { expect, suite, test } from "vitest";
import signal from "../../dist";

suite("stop invoking effects when a signal changes", () => {
	test("stops invoking an effect", () => {
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
			expect(count).toStrictEqual(2);
		}, 1500);
	});

	test("stops invoking multiple effects", () => {
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
			expect(count).toStrictEqual(4);
		}, 1500);
	});
});
