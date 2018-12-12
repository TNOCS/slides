import m, { Component } from 'mithril';
import { ISlide, IBaseSlide } from '../../models/slide';
import { markdown } from '../../services/utils';

export const MarkdownSlide = (): Component<ISlide> => {
  const createMarkdown = () => {
    const titleToHTML = (title?: string) => (title ? markdown(title) : '');
    const columnToHTML = (content?: string) => (content ? `<div class="col">${markdown(content)}</div>` : '');
    const columnsToHTML = (title?: string, left?: string, right?: string) =>
      title || left || right
        ? `${titleToHTML(title)}
<div class="columns">
  ${columnToHTML(left)}
  ${columnToHTML(right)}
</div>
` // The last line break is important
        : '';
    const slideToHtml = (slide: ISlide | IBaseSlide) => {
      const { content, left, right, title, layout } = slide;
      return content || layout === 'default'
        ? markdown(content)
        : columnsToHTML(title, left, right);
    };
    return {
      view: ({ attrs: slide }) => {
        const slides = (slide as ISlide).slides || [];
        const verticalSlides = '\n\n' + slides.map(s => slideToHtml(s)).join('\n\n');
        return m('textarea[data-template]', slideToHtml(slide) + verticalSlides);
      },
    } as Component<ISlide>;
  };
  return {
    view: ({ attrs }) => {
      return m('section[data-markdown][data-separator-vertical=^\\r?\\n\\r?\\n][data-separator-notes=^Note:]', [
        m(createMarkdown, attrs),
      ]);
    },
  };
};
