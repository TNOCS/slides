import m, { RouteDefs } from 'mithril';
import { Layout } from './components/layout';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './css/styles.css';
import './assets/favicon.ico';
import { HomePage } from './components/home/home-page';
import { SlidesViewer } from './components/slides-viewer/slides-viewer';

const routingTable: RouteDefs = {
  '/': {
    render: () => m(Layout, { theme: '.white-theme' }, m(HomePage)),
  },
  '/slides': {
    render: () => m(SlidesViewer),
  },
};

m.route(document.body, '/', routingTable);
