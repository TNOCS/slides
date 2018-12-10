declare module '*/reveal' {
  interface IInitializeOptions {
    /** Display presentation control arrows, default true */
    controls: boolean;
    /**
     * Help the user learn the controls by providing hints, for example by
     * bouncing the down arrow when they first encounter a vertical slide.
     * Default true.
     */
    controlsTutorial: boolean;
    /**
     * Determines where controls appear.
     * @default "bottom-right"
     */
    controlsLayout: 'bottom-right' | 'edges';
    /**
     * Visibility rule for backwards navigation arrows
     * @default "faded"
     */
    controlsBackArrows: 'faded' | 'hidden' | 'visible';
    /** Display a presentation progress bar, default true. */
    progress: boolean;
    /** Display the page number of the current slide, default false. */
    slideNumber: boolean;
    /** Push each slide change to the browser history, default false. */
    history: boolean;
    /** Enable keyboard shortcuts for navigation, default true. */
    keyboard: boolean;
    /** Enable the slide overview mode, default true. */
    overview: boolean;
    /** Vertical centering of slides, default true. */
    center: boolean;
    /** Enables touch navigation on devices with touch input, default true. */
    touch: boolean;
    /** Loop the presentation, default false. */
    loop: boolean;
    /** Change the presentation direction to be RTL, default false. */
    rtl: boolean;
    /** Randomizes the order of slides each time the presentation loads, default false. */
    shuffle: boolean;
    /** Turns fragments on and off globally, default true. */
    fragments: boolean;
    /** Flags whether to include the current fragment in the URL, */
    /** so that reloading brings you to the same fragment position, default false. */
    fragmentInURL: boolean;
    /**
     * Flags if the presentation is running in an embedded mode,
     * i.e. contained within a limited portion of the screen, default false.
     */
    embedded: boolean;
    /** Flags if we should show a help overlay when the questionmark key is pressed, default true. */
    help: boolean;
    /** Flags if speaker notes should be visible to all viewers, default false. */
    showNotes: boolean;
    /** Global override for autoplaying embedded media (video/audio/iframe), default null.
     * - null: Media will only autoplay if data-autoplay is present
     * - true: All media will autoplay, regardless of individual setting
     * - false: No media will autoplay, regardless of individual setting
     */
    autoPlayMedia: null | boolean;
    /**
     * Number of milliseconds between automatically proceeding to the
     * next slide, disabled when set to 0, this value can be overwritten
     * by using a data-autoslide attribute on your slides (default 0).
     */
    autoSlide: number;
    /** Stop auto-sliding after user input, default true. */
    autoSlideStoppable: boolean;
    /** Use this method for navigation when auto-sliding, default Reveal.navigateNext */
    autoSlideMethod: Function;
    /**
     * Specify the average time in seconds that you think you will spend
     * presenting each slide. This is used to show a pacing timer in the
     * speaker view (default 120).
     */
    defaultTiming: number;
    /** Enable slide navigation via mouse wheel, default false. */
    mouseWheel: boolean;
    /** Hides the address bar on mobile devices, default true. */
    hideAddressBar: boolean;
    /**
     * Opens links in an iframe preview overlay.
     * Add `data-preview-link` and `data-preview-link="false"` to customise each link
     * individually, default false.
     */
    previewLinks: boolean;
    /** Transition style, default 'slide'. */
    transition: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
    /** Transition speed */
    transitionSpeed: 'default' | 'fast' | 'slow';
    /** Transition style for full page slide backgrounds, default 'fade'. */
    backgroundTransition: 'none' | 'fade' | 'slide' | 'convex' | 'concave' | 'zoom';
    /** Number of slides away from the current that are visible, default 3 */
    viewDistance: number;
    /**
     * Parallax background image, default empty string.
     * e.g. 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'.
     */
    parallaxBackgroundImage: string;
    /** Parallax background size as CSS syntax, e.g. "2100px 900px", default empty string. */
    parallaxBackgroundSize: string;
    /**
     * Number of pixels to horizontally move the parallax background per slide (default null):
     * - Calculated automatically unless specified
     * - Set to 0 to disable movement along an axis
     */
    parallaxBackgroundHorizontal: null | number;
    /**
     * Number of pixels to vertically move the parallax background per slide (default null):
     * - Calculated automatically unless specified
     * - Set to 0 to disable movement along an axis
     */
    parallaxBackgroundVertical: null;
    /** The CSS display mode that will be used to show slides, default 'block'. */
    display: string;
    /**
     * The "normal" width of the presentation, aspect ratio will be preserved
     * when the presentation is scaled to fit different resolutions. Can be
     * specified using percentage units (default 960).
     */
    width: number | string;
    /**
     * The "normal" height of the presentation, aspect ratio will be preserved
     * when the presentation is scaled to fit different resolutions. Can be
     * specified using percentage units (default 700).
     */
    height: number | string;
    /**
     * Factor of the display size that should remain empty around the content
     * @default 0.1
     */
    margin: number;
    /** Bounds for smallest possible scale to apply to content, default 0.2. */
    minScale: number;
    /** Bounds for largest possible scale to apply to content, default 1.5. */
    maxScale: number;
    /** Options which are passed into marked, see https://github.com/chjj/marked#options-1. */
    markdown: {
      smartypants: boolean;
      [key: string]: any;
    };
    /** Plugins */
    dependencies: Array<{
      /** Path to the script to load. */
      src: string;
      /** Flags if the script should load after reveal.js has started, defaults to false. */
      async?: boolean;
      /** Function which must return true for the script to be loaded. */
      condition?: () => boolean;
      /** Function to execute when the script has loaded. */
      callback?: () => void;
    }>;
  }
  interface IReveal {
    initialize: (options: Partial<IInitializeOptions>) => void;
    configure: (options: Partial<IInitializeOptions>) => void;
    /** A ready event is fired when reveal.js has loaded all non-async dependencies and is ready to start navigating. */
    addEventListener: (eventName: 'ready' | 'slidechanged', cb: (eventName: string) => void) => void;
    /** To check whether Reveal is ready. */
    isReady: () => boolean;
    slide: (slideIndex: number, childIndex?: number, fragmentIndex?: number) => void;
    left: () => void;
    right: () => void;
    up: () => void;
    down: () => void;
    prev: () => void;
    next: () => void;
    prevFragment: () => void;
    nextFragment: () => void;
    navigateNext: () => void;
    shuffle: () => void;
    toggleOverview: () => void;
    togglePause: () => void;
    toggleAutoSlide: () => void;
    toggleHelp: () => void;
    getConfig: () => Partial<IInitializeOptions>;
    getIndices: () => { h: number, v: number, f: number };
    getSlidePastCount: () => number;
    getProgress: () => number;
    getSlides: () => number;
    getTotalSlides: () => number;
    isFirstSlide: () => boolean;
    isLastSlide: () => boolean;
    isOverview: () => boolean;
    isPaused: () => boolean;
    isAutoSliding: () => boolean;
    /** Get the speaker notes for the current slide. */
    getSlideNotes: () => string;
  }

  const foo: IReveal;
  export default foo;
}
