import { expect, suite, test } from "vitest";
import signal from "../../dist";

suite("invoke effects when a signal changes", () => {
	test("invokes an effect", () => {
		const $signal = signal("test");
		let count = 0;

		$signal.effect(() => {
			count += 1;
		});

		globalThis.setTimeout(() => {
			$signal.set("new test");
		}, 500);

		globalThis.setTimeout(() => {
			expect(count).toStrictEqual(2);
		}, 1000);
	});

	test("invokes multiple effects and in order", () => {
		const $signal = signal("test");
		let order: number[] = [];

		$signal.effect(() => {
			order = [ ...order, 1 ];
		});

		$signal.effect(() => {
			order = [ ...order, 2 ];
		});

		$signal.effect(() => {
			order = [ ...order, 3 ];
		});

		globalThis.setTimeout(() => {
			$signal.set("new test");
		}, 500);

		globalThis.setTimeout(() => {
			expect(order).toStrictEqual([ 1, 2, 3, 1, 2, 3 ]);
		}, 1000);
	});

	test("doesn't invoke an effect if the signal's value stays the same", () => {
		const $signal = signal("test");
		let count = 0;

		$signal.effect(() => {
			count += 1;
		});

		globalThis.setTimeout(() => {
			$signal.set("test");
		}, 500);

		globalThis.setTimeout(() => {
			expect(count).toStrictEqual(1);
		}, 1000);
	});

	test("batches effect executions", () => {
		const $signal = signal("test");
		let count = 0;

		$signal.effect(() => {
			count += 1;
		});

		$signal.set("test1");
		$signal.set("test2");
		$signal.set("test3");
		$signal.set("test4");
		$signal.set("test5");

		globalThis.setTimeout(() => {
			expect(count).toStrictEqual(1);
		}, 1000);
	});

	test("exposes the signal's value to the effect", () => {
		const $signal = signal("test");

		$signal.effect(value => {
			expect(value).toStrictEqual("test");
		});
	});
});
