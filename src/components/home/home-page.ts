import m, { Component } from 'mithril';
import { SlideSvc } from '../../services/slides-service';
import { Options, IInputOption } from 'mithril-materialized';
import { ISlide } from '../../models/slide';

export const HomePage = () => {
  const state = {
    tags: [] as IInputOption[],
  };
  const onchange = (isChecked: boolean, id: string) => {
    state.tags = state.tags.map(o => {
      o.isChecked = o.id === id ? isChecked : o.isChecked;
      return o;
    });
  };
  return {
    oninit: () => {
      SlideSvc.addEventListener('ready', () => {
        state.tags = SlideSvc.tags().map(tag => ({ id: tag, label: tag, isChecked: true }));
        m.redraw();
      });
      SlideSvc.init();
    },
    view: () => {
      const selectedTags = state.tags.filter(o => o.isChecked).map(o => o.label);
      const isSlideSelected = (slide: ISlide) =>
        slide.tags && slide.tags.reduce((acc, tag) => acc || selectedTags.indexOf(tag) >= 0, false);
      const slides = SlideSvc.slides().filter(isSlideSelected);
      return [
        m('h2', 'What do you want to see?'),
        m('a[href=/slides]', { oncreate: m.route.link }, 'Go to slides...'),
        m('p', 'Select the slides using the tags, year or otherwise.'),
        // m(Chips, { data }),
        m(Options, { label: 'Select the tags to show', options: state.tags, onchange }),
        m('h4', 'Selected slides'),
        m(
          'ul.collection',
          slides.map(slide =>
            m('li.collection-item', [
              m('span.title', slide.title || slide.id),
              slide.slides
                ? m('ul', slide.slides.map(child => m('li', '- ' + (child.title || child.id || child.content))))
                : undefined,
            ])
          )
        ),
      ];
    },
  } as Component;
};
