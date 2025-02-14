# Virutalized Masonry Grid

Simple virtualized masonry grid

## Installation

```js
  npm i
```

## Run

```js
  npm run dev
```

## Make a build

```js
  npm run build
```

## Details

Short description

Grid and columns are generated via a config file based on screen breakpoints

Items are added to columns based on smallest column height to ensure masonry layout.

Virtualization is ensuder by checking which current items are intersecting the masonry container, only intersected items will be rendered to the DOM.

Optimization is done by debouncing the window resize and scroll events to reduce component rerenders.


