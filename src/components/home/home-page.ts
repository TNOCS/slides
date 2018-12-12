import m, { Component } from 'mithril';
import { SlideSvc } from '../../services/slides-service';
import { Options, IInputOption, FlatButton } from 'mithril-materialized';

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
      const slides = SlideSvc.slides(selectedTags);
      const href = `/slides?tags=${selectedTags.join(',')}`;
      return [
        m('.col.s12.m6', [
          m('h3', 'What do you want to see?'),
          m(`a[href=${href}]`, { oncreate: m.route.link }, 'Go to slides...'),
          m('p', 'Select the slides you want to show using the tags:'),
          m(Options, { label: 'Select the tags to show', options: state.tags, onchange }),
          m(FlatButton, {
            label: 'Clear all tags',
            ui: { onclick: () => state.tags.forEach(t => (t.isChecked = false)) },
          }),
        ]),
        m('.col.s12.m6', [
          m('h4', 'Selected slides'),
          m(
            'ul.collection',
            slides.map(slide =>
              m('li.collection-item', [
                m('span.title', (slide.id || '').replace(/#/g, '')),
                slide.slides
                  ? m(
                      'ul',
                      slide.slides.map(child =>
                        m('li', '- ' + (child.id || child.title || child.content).replace(/#/g, ''))
                      )
                    )
                  : undefined,
              ])
            )
          ),
        ]),
      ];
    },
  } as Component;
};
