// Quiz question/choice text can contain non-breaking spaces (U+00A0) because
// react-quill-new serializes editor content via getSemanticHTML(), which
// replaces every regular space with an nbsp entity. NBSP is not a valid
// line-break opportunity, so a whole sentence becomes one unbreakable token
// and the browser is forced to split words mid-word to avoid overflow.
// Normalizing these characters restores normal word-boundary wrapping.
export function cleanText(str) {
  if (!str) return "";
  return str
    .replace(/\u00A0/g, " ") // non-breaking space -> regular space
    .replace(/\u00AD/g, "")  // soft hyphen
    .replace(/\u200B/g, "")  // zero-width space
    .replace(/\u2060/g, "")  // word joiner
    .replace(/\uFEFF/g, ""); // zero-width no-break space / BOM
}

// Strips HTML tags/entities (from the rich-text quiz editor) and normalizes
// whitespace so the result renders as plain text that wraps at word boundaries.
export function stripHtml(html) {
  if (!html) return "";
  const doc = new DOMParser().parseFromString(html, "text/html");
  return cleanText(doc.body.textContent || "");
}
