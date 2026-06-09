Production build recommendations

1) Precompile JSX and bundle assets
- Use a small bundler (esbuild) to transpile JSX, minify and bundle files.
- Example (install esbuild globally or as dev dep):
  npx esbuild app.jsx windows.jsx window.jsx data.jsx --bundle --outdir=dist --minify --sourcemap
- Serve `dist/` and update `Nuria Portfolio.html` to load compiled scripts (remove Babel).

2) Swap to production React builds (already included):
- Use the UMD `react.production.min.js` and `react-dom.production.min.js` for simple CDN deployments.
- For best performance, prefer bundling React into the app or use `react` as external and load the CDN only.

3) Lazy-load non-critical scripts
- Defer loading of the `TweaksPanel` and other development helpers.
- Example dynamic import inside `app.jsx`:
  if (showTweaks) import('./tweaks-panel.jsx').then(m => { /* mount tweaks */ });

4) Optimize images
- Compress PNG/JPEG using `squoosh` or `imagemin` and generate responsive sizes (`srcset`) for large visuals.
- Keep small pixel-art images as PNG and mark them with `pixelated: true` as in `data.jsx`.

5) Accessibility & performance
- Add `rel="preload"` for critical fonts and `width`/`height` for images to avoid CLS.
- Remove in-browser Babel in production to eliminate runtime transpilation.

6) Deploy
- Use Netlify, Vercel, or a static host. Push `dist/` as the site root.

If you want, I can add an `esbuild` script and create a minimal `dist/` bundle for preview.