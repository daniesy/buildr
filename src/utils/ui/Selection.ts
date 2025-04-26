export function getSelection(target?: Window) {
  const sel = (target || window).getSelection();
  if (sel) {
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  }
  return null;
}

export function restoreSelection(range: Range, target?: Window) {
  if (range) {
    const sel = (target || window).getSelection();

    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}

export function hasSelectedLink(target?: Window) {
  const selection = getSelection(target);
  if (selection) {
    const node = selection.startContainer;
    if (node.nodeType === Node.TEXT_NODE) {
      return node.parentElement?.closest("a") !== null;
    }
  }
  return false;
}
