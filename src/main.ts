import Reveal from "reveal.js";
import Highlight from "reveal.js/plugin/highlight/highlight.esm.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import Notes from "reveal.js/plugin/notes/notes.esm.js";

import "reveal.js/plugin/highlight/monokai.css";

let deck = new Reveal({
  plugins: [Markdown, Notes, Highlight],
  history: true,
  autoAnimate: true,
});
deck.initialize();
