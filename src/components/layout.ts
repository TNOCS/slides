import m, { Component } from 'mithril';
// import icon from '../assets/esdl-store-icon.svg';

export const Layout = () =>
  ({
    view: vnode =>
      m(`.container${vnode.attrs.theme}`, [
        m(
          'nav',
          m('.nav-wrapper', [
            m(
              'a.brand-logo',
              { style: 'margin-left: 20px' },
              'LOGO'
              // m(`img[width=90][height=90][src=${icon}]`, { style: 'margin-top: -10px; margin-left: -10px;' })
            ),
            m('ul.right'),
          ])
        ),
        m('.main', m('.row', vnode.children)),
      ]),
  } as Component<{ theme: string }>);
