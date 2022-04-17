import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';

import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import { AnimatePresence } from 'framer-motion';

import dynamic from 'next/dynamic';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import config from '../constants/config';
import '../style/styles.css';
import theme from '../style/theme';
import '../components/logos/logo.css';

const isProduction =
  !process.env.NEXT_PUBLIC_ENV_DESC ||
  process.env.NEXT_PUBLIC_ENV_DESC !== 'development';

let GoogleTagManagerWithNoSSR = null;

if (isProduction) {
  GoogleTagManagerWithNoSSR = dynamic(
    () => import('../components/tools/google-tag-manager'),
    { ssr: false }
  );

  Sentry.init({
    dsn: config.sentryDSN,
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    environment: 'production'
  });
}

// Create a client
const queryClient = new QueryClient();

// The handler to smoothly scroll the element into view
const handleExitComplete = () => {
  if (typeof window !== 'undefined') {
    // Get the hash from the url
    const hashId = window.location.hash;

    if (hashId) {
      // Use the hash to find the first element with that id
      const element = document.querySelector(hashId);

      if (element) {
        // Smooth scroll to that elment
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  }
};

const PageTemplate = dynamic(
  () => {
    return import('../components/page-template');
  },
  { ssr: false }
);

function SafeHydrate({ children }) {
  const isServer = () => typeof window === 'undefined';

  return (
    <div suppressHydrationWarning>
      {isServer() ? null : (
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ChakraProvider theme={theme}>
            {/* <Fonts /> */}
            {isProduction && <GoogleTagManagerWithNoSSR />}
            <AnimatePresence
              exitBeforeEnter
              onExitComplete={handleExitComplete}
            >
              <PageTemplate>{children}</PageTemplate>
            </AnimatePresence>
          </ChakraProvider>
        </QueryClientProvider>
      )}
    </div>
  );
}

function App({ Component, pageProps }) {
  return (
    <SafeHydrate>
      <Component {...pageProps}></Component>
    </SafeHydrate>
  );
}

export default App;
