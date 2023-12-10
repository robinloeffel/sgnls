# `sgnls`

[![version on npm](https://badgen.net/npm/v/sgnls)](https://www.npmjs.com/package/sgnls)
[![weekly downloads on npm](https://badgen.net/npm/dw/sgnls)](https://www.npmjs.com/package/sgnls)
[![types](https://badgen.net/npm/types/sgnls)](https://www.npmjs.com/package/sgnls)
[![minified size](https://badgen.net/bundlephobia/minzip/sgnls)](https://bundlephobia.com/package/sgnls)
[![node version](https://badgen.net/npm/node/sgnls)](https://github.com/nodejs/Release)
[![license](https://badgen.net/npm/license/sgnls)](https://github.com/robinloeffel/sgnls/blob/main/license.txt)

> small, simple signals for the browser and node

an easy way to create and use signals in your code base, with a tiny footprint.

## usage

```sh
npm i sgnls
```

```ts
import signal from 'sgnls';

const $favPasta = signal('lasagna');

$favPasta.effect(newValue => {
  document.title = `my favorite pasta is ${newValue}`;
});

$favPasta.set('carbonara');
```

## api

### `import`

`sgnls` comes with a straightforward api. it exports one default function, which returns a signal object.

```ts
import signal from 'sgnls';

const $signal = signal('initial value');
```

said object then exposes the following five methods.

### `get`

returns the current value of the signal.

```ts
const $signal = signal('initial value');

$signal.get();
```

### `set`

sets the value of the signal.

```ts
const $signal = signal('initial value');

$signal.set('new value');
```

### `update`

updates the value of the signal by mutating it through a function.

```ts
const $signal = signal(['a', 'b', 'c']);

$signal.update(value => [...value, 'd']);
```

### `effect`

sets up an effect to be called whenever the signal changes.

_note: the effect is called once immediately after the setup!_

```ts
const $signal = signal('initial value');

$signal.effect(newValue => {
  console.log(newValue);
});

$signal.set('new value');
```

### `stop`

stops the attached effects from invoking.

```ts
const $signal = signal('initial value');

$signal.stop();
```

## license

mit
