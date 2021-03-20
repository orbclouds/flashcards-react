import React, {
  StrictMode,
} from 'react';
import { render } from 'react-dom';
import ReactGA from 'react-ga';

import CardsProvider from '@app/context/Cards';
import App from '@app/App';
import '@app/global.css';

const target = document.getElementById(
  'app'
);

render(
  <StrictMode>
    <CardsProvider>
      <App />
    </CardsProvider>
  </StrictMode>,
  target
);

ReactGA.initialize(
  import.meta.env
    .SNOWPACK_PUBLIC_GOOGLE_ANALYTICS_ID
);
ReactGA.pageview(
  window.location.pathname +
    window.location.search
);
