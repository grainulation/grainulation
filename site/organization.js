// Only the paired preview server injects this marker. Ordinary static hosting,
// including a local server on port 4518, keeps the authored public destinations.
const productPort = document.querySelector('meta[name="grainulator-product-port"]')?.content;
if (
  ['127.0.0.1', 'localhost', '[::1]'].includes(location.hostname) &&
  /^\d+$/.test(productPort || '') &&
  Number(productPort) > 0 &&
  Number(productPort) <= 65535
) {
  for (const link of document.querySelectorAll('[data-product-path]')) {
    const destination = new URL(location.origin);
    destination.port = productPort;
    destination.pathname = link.dataset.productPath;
    link.href = destination.href;
  }
}
