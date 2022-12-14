Prism.plugins.toolbar.registerButton('download-file', function (env) {
  var pre = env.element.parentNode;
  if (!pre || !/pre/i.test(pre.nodeName) || !pre.hasAttribute('data-src') || !pre.hasAttribute('data-filename')) {
    return;
  }
  var a = document.createElement('a');
  a.textContent = pre.getAttribute('data-download-link-label') || 'Download';
  a.setAttribute('download', pre.getAttribute('data-filename'));
  a.target = '_blank';
  a.href = pre.getAttribute('data-src');
  return a;
});