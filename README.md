# CompoHub – HTML/CSS/JS Component Marketplace

Browse, preview (with responsive toggle), and copy HTML / CSS / JS for UI components. Zero build step.

## Add a component
Append an object to the `COMPONENTS` array in `components.js`:

```js
{ id, name, category, description, html, css, js }
```

## Run locally
`npx serve .` or open `index.html`.

## Deploy
Static site; Vercel auto-detects it (no build command).
