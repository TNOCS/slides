import '../../reveal/css/reveal.css';
import '../../reveal/css/theme/black.css';
import '../../reveal/lib/css/zenburn.css';
import '../../reveal/lib/js/head.min.js';
import reveal from '../../reveal/js/reveal';
import m, { Component } from 'mithril';
import { SlideSvc } from '../../services/slides-service';
import { MarkdownSlide } from './markdown-slide';

declare var hljs: any;
(window as any).Reveal = reveal;

const initReveal = () => {
  reveal.initialize({
    // history: true,
    width: 1912,
    height: 1072,

    dependencies: [
      // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
      {
        src: './lib/js/classList.js',
        condition: () => !document.body.classList,
      },
      { src: './plugin/markdown/marked.js' },
      { src: './plugin/markdown/markdown.js' },
      // Speaker notes
      { src: './plugin/notes/notes.js', async: true },
      {
        src: './plugin/highlight/highlight.js',
        async: true,
        callback: () => {
          hljs.initHighlightingOnLoad();
        },
      },
      // Zoom in and out with Alt+click
      { src: './plugin/zoom-js/zoom.js', async: true },
      // MathJax
      // { src: './plugin/math/math.js', async: true },
    ],
  });
};

export const SlidesViewer = () => {
  return {
    oninit: () => {
      SlideSvc.addEventListener('ready', () => m.redraw());
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = window.location.search.match(/print-pdf/gi) ? 'css/print/pdf.css' : 'css/print/paper.css';
      document.getElementsByTagName('head')[0].appendChild(link);
      SlideSvc.init();
    },
    oncreate: () => initReveal(),
    onupdate: () => initReveal(),
    view: () => {
      const url = m.route.get();
      const query = url.split('?')[1];
      const tags = query ? m.parseQueryString('?' + query).tags : undefined;
      const selectedTags = tags ? tags.split(',') : undefined;
      console.log(`Preparing ${SlideSvc.slides(selectedTags).length} slides...`);
      return m('.reveal', m('.slides', SlideSvc.slides(selectedTags).map(slide => m(MarkdownSlide, slide))));
    },
  } as Component;
};
