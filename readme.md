# `sgnls`

[![version on npm](https://img.shields.io/npm/v/sgnls)](https://www.npmjs.com/package/sgnls)
[![weekly downloads on npm](https://img.shields.io/npm/dw/sgnls)](https://www.npmjs.com/package/sgnls)
[![minified size](https://img.shields.io/bundlephobia/min/sgnls)](https://bundlephobia.com/package/sgnls)
[![license](https://img.shields.io/github/license/robinloeffel/sgnls)](https://github.com/robinloeffel/sgnls)

> small, simple signals for the browser and node

an easy way to create and use signals in your code base, with a tiny footprint and full type support.

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

said object then exposes the following four methods.

### `get`

returns the current value of the signal.

```ts
const $signal = signal('initial value');

$signal.get();
```

### `set`

updates the value of the signal.

```ts
const $signal = signal('initial value');

$signal.set('new value');
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
