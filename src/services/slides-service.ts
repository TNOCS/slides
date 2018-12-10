import { ISlide, IPresentation } from '../models/slide';
import m from 'mithril';
import yaml from 'js-yaml';

declare const DEVMODE: boolean; // Inserted by WEBPACK.
// console.log(`DEVMODE: ${DEVMODE}`);

/**
 * The slide service loads a YAML file that contains the slides, including tags, titles, etc.
 * In production, the content file will be loaded from github, during development, from the source
 * folder.
 * It can be configured to only show certain slides, tags or times...
 */
const SlideService = () => {
  const state = {
    isLoading: false,
    hasLoaded: false,
    presentation: {} as IPresentation,
    tags: [] as string[],
    selectedTags: [] as string[],
    years: [] as number[],
    callbacks: {} as {
      [key: string]: Array<() => void>;
    },
  };

  return {
    addEventListener: (event: 'ready', callback: () => void) => {
      if (!state.callbacks.hasOwnProperty(event)) {
        state.callbacks[event] = [];
      }
      state.callbacks[event].push(callback);
    },
    init: async () => {
      if (state.isLoading || state.hasLoaded) {
        return;
      }
      state.isLoading = true;
      state.hasLoaded = false;
      const url = DEVMODE
        ? 'content/cs.slides.yaml'
        : 'https://raw.githubusercontent.com/TNOCS/slides/master/content/cs.slides.yaml';
      state.presentation = await m.request<IPresentation>(url, { deserialize: yaml.safeLoad });
      const { slides } = state.presentation;
      state.tags = slides
        .reduce((acc, curSlide) => (curSlide.tags ? [...acc, ...curSlide.tags] : acc), [] as string[])
        .reduce((acc, curTag) => (acc.indexOf(curTag) < 0 ? [...acc, curTag] : acc), [] as string[]);
      state.selectedTags = state.tags.map(t => t);
      state.years = slides.reduce(
        (acc, curSlide) => (curSlide.year && acc.indexOf(curSlide.year) < 0 ? [...acc, curSlide.year] : acc),
        [] as number[]
      );
      state.isLoading = false;
      state.hasLoaded = true;
      const cb = state.callbacks.ready || [];
      cb.forEach(c => c());
    },
    tags: () => state.selectedTags,
    slides: () => state.presentation.slides || [],
  };
};

export const SlideSvc = SlideService();
