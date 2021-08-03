import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import getMuiTheme, { getGlobalCss } from 'utils/getMuiTheme';
import getPrefersColorScheme from 'utils/getPrefersColorScheme';
import { TYPEKEV_SITE_PREFERS_COLOR_SCHEME, COLOR_SCHEME_CODE_MAP } from 'resources/constants';
import Page from 'templates/Page';
import useDrawer from 'hooks/useDrawer';
import Header from 'components/Header';
import Copyright from 'components/Copyright';
import Drawer from 'components/Drawer';
import Root from 'App/Root';
import './index.css';
import MesAnnonces from 'routes/MesAnnonces';

export const voitures = React.lazy(() => import('routes/voitures'));
export const motos = React.lazy(() => import('routes/motos'));
export const velos = React.lazy(() => import('routes/velos'));
export const Blog = React.lazy(() => import('routes/Blog'));
export const Contact = React.lazy(() => import('routes/Contact'));




export const togglePrefersColorScheme = (SELECTED_COLOR_SCHEME, setCookie) => () =>
  setCookie(
    TYPEKEV_SITE_PREFERS_COLOR_SCHEME,
    SELECTED_COLOR_SCHEME === COLOR_SCHEME_CODE_MAP.DARK
      ? COLOR_SCHEME_CODE_MAP.LIGHT
      : COLOR_SCHEME_CODE_MAP.DARK,
    {
      path: '/',
    },
  );

export const normalizePath = hash =>
  hash
    .split('')
    .filter((char, indexOfChar) => char !== '/' || char !== hash[indexOfChar + 1])
    .join('')
    .substring(1);

export const Main = styled.div`
  flex: 1 1 auto;
  display: flex;
`;

export default function App() {
  const { hash } = window.location;
  const [open, toggleDrawer] = useDrawer();
  const [cookies, setCookie] = useCookies([TYPEKEV_SITE_PREFERS_COLOR_SCHEME]);
  const SELECTED_COLOR_SCHEME =
    cookies[TYPEKEV_SITE_PREFERS_COLOR_SCHEME] || getPrefersColorScheme();

  const theme = getMuiTheme(SELECTED_COLOR_SCHEME);
  const GlobalCss = getGlobalCss(theme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalCss />
      <Router>
        <Drawer open={open} toggleDrawer={toggleDrawer} />
        <Root open={open}>
          <Header
            open={open}
            toggleDrawer={toggleDrawer}
            togglePrefersColorScheme={togglePrefersColorScheme(SELECTED_COLOR_SCHEME, setCookie)}
          />
          <Main>
            <Page open={open}>
              <Suspense fallback={<LinearProgress color="secondary" />}>
                <Switch>
                  <Route exact path="/voitures/" component={voitures} />
                  <Route exact path="/motos/" component={motos} />
                  <Route exact path="/velos/" component={velos} />
                  <Route exact path="/blog/:postId?" component={Blog} />
                  <Route exact path="/contact/" component={Contact} />
                  <Route exact path="/MesAnnonces/" component={MesAnnonces} />
                  {!!hash && <Redirect to={normalizePath(hash)} />}
                  <Route exact path="/" component={voitures} />
                  <Redirect to="/voitures/" />
                </Switch>
              </Suspense>
            </Page>
          </Main>
          <Copyright />
        </Root>
      </Router>
    </MuiThemeProvider>
  );
}
