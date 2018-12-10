import { Renderer, parse } from 'marked';

const createMarkdownParser = () => {
  const renderer = new Renderer({
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: true,
    headerIds: false,
  });
  // renderer.paragraph = (text: string) => text; // to avoid wrapping each paragraph in a <p>text</p>
  renderer.list = (body: string, ordered: boolean) =>
    ordered ? `<ol>${body}</ol>` : `<ul class="browser-default">${body}</ul>`;
  return (s: string) => parse(s, { renderer });
};
export const markdown = createMarkdownParser();
