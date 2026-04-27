// Splits text nodes inside .text-reveal into per-word spans
// so CSS can animate a line-by-line reveal.
// Usage: <h1 class="text-reveal">some text</h1>
// If element has .text-reveal--lines, splits by line-break (via <br>).

const targets = document.querySelectorAll('.text-reveal');

targets.forEach((el) => {
  if (el.dataset.split === 'done') return;

  const splitMode = el.classList.contains('text-reveal--lines') ? 'lines' : 'words';

  // Only split plain text children — leave inline elements (like <em>, <strong>) intact.
  const splitTextNode = (node, startIndex) => {
    const words = node.textContent.split(/(\s+)/);
    const frag = document.createDocumentFragment();
    let i = startIndex;
    words.forEach((w) => {
      if (!w) return;
      if (/^\s+$/.test(w)) {
        frag.appendChild(document.createTextNode(w));
      } else {
        const outer = document.createElement('span');
        outer.className = 'word';
        const inner = document.createElement('span');
        inner.style.setProperty('--i', i++);
        inner.textContent = w;
        outer.appendChild(inner);
        frag.appendChild(outer);
      }
    });
    node.parentNode.replaceChild(frag, node);
    return i;
  };

  const walk = (parent, startIdx) => {
    let idx = startIdx;
    const children = Array.from(parent.childNodes);
    children.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
        idx = splitTextNode(child, idx);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        // Wrap inline element text the same way
        if (child.tagName === 'BR') return;
        idx = walk(child, idx);
      }
    });
    return idx;
  };

  if (splitMode === 'words') {
    walk(el, 0);
  }

  el.dataset.split = 'done';
});
