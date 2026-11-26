# Portfolio icons

PNG icons used by `createIcon()` in `script.js`. The files are named after the
icon keys in the JavaScript, so adding an icon means dropping a matching
`<name>.png` in this folder.

- **Library:** [Tabler Icons](https://tabler.io/icons) — MIT License
- **Package:** [`@tabler/icons-png`](https://www.npmjs.com/package/@tabler/icons-png) `3.53.0`, outline set
- **Processing:** source PNGs are tinted to the site palette and downscaled to 96×96.

To regenerate all icons (requires Python 3 and Pillow, plus network access):

```sh
python3 icons/build-icons.py
```

The mapping of local names to Tabler source icons and their colors lives in
`build-icons.py`.
