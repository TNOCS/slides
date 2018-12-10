export interface IBaseSlide {
  /**
   * Slide layout. When using '2col', please specify the title, left and right property.
   * @default 'default'
   */
  layout: 'default' | '2col';
  /** Markdown content, representing the slide: */
  content: string;
  /** Slide ID, so we can refer to it. */
  id?: string;
  /** Optional title, to be inserted before the content */
  title?: string;
  /** Markdown content, representing the left half of the slide: */
  left?: string;
  /** Markdown content, representing the right half of the slide: */
  right?: string;
  /** Optional speaker notes, may also be generated using 'Note: xxx' in the markdown content */
  note?: string;
}

export interface ISlide extends IBaseSlide {
  /** Slide ID, so we can refer to it. */
  id: string;
  /** Slide tags, for filtering too. */
  tags: string[];
  /** Year of publication */
  year?: number;
  /** Month of publication */
  month?: number;
  /** Creates a vertical slide */
  slides?: IBaseSlide[];
}

export interface IPresentation {
  slides: ISlide[];
}
