# `sgnls`

![npm](https://img.shields.io/npm/v/sgnls)
![npm](https://img.shields.io/npm/dw/sgnls)
![dependencies](https://img.shields.io/badge/dependencies-none-blue)

> smol, simple signals

an easy way to create and use signals in your code base, with a tiny footprint and full type support.

## usage

```bash
npm i sgnls
```

```typescript
import signal from 'sgnls';

const $favPasta = signal('lasagna');

$favPasta.effect(newValue => {
  document.title = `my favorite pasta is ${newValue}`;
});

$favPasta.set('carbonara');
```

## api

### `init`

`sgnls` comes with a very straightforward api. it exports one default function, which returns a signal object.

```typescript
import signal from 'sgnls';

const $signal = signal('initial value');
```

said object then exposes the following four methods.

### `get`

returns the current value of the signal.

```typescript
const $signal = signal('initial value');

$signal.get();
```

### `set`

updates the value of the signal.

```typescript
const $signal = signal('initial value');

$signal.set('new value');
```

### `effect`

sets up an effect to be called whenever the signal changes.

_note: the effect is called once immediately after the setup!_

```typescript
const $signal = signal('initial value');

$signal.effect(newValue => {
  console.log(newValue);
});

$signal.set('new value');
```

### `stop`

stops the attached effects from invoking.

```typescript
const $signal = signal('initial value');

$signal.stop();
```

## license

mit
