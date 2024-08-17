/* Handle missing `exports`. */
// FIXME Polyfills to support `@psf/bch-js` node dependencies.
if (typeof globalThis.exports === 'undefined' || !globalThis.exports) {
    console.info('Injecting `exports` polyfill into `globalThis`...')
    globalThis.exports = {}
}
