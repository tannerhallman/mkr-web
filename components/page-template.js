import { useBreakpointValue } from '@chakra-ui/media-query';

import {
  AuthenticatedRoutesWrapper,
  DappProvider
} from '@elrondnetwork/dapp-core';

import React from 'react';

import Footer from '../components/footer';
import Header from '../components/header';
import { MAIN_NAV } from '../constants/nav';

import SectionContainer from './sections/section-container';

export default function PageTemplate({ children }) {
  const backgroundPosition = useBreakpointValue({ base: 'bottom', md: 'top' });

  return (
    <DappProvider
      environment={process.env.NEXT_PUBLIC_ELROND_NETWORK || 'devnet'}
      completedTransactionsDelay={500}
    >
      <AuthenticatedRoutesWrapper routes={[]} />
      <Header navItems={MAIN_NAV} />
      {children}
      <SectionContainer
        background="url('img/footer-back.jpeg')"
        // backgroundColor={'#348C31'}
        backgroundPosition={backgroundPosition}
      ></SectionContainer>
      <Footer navItems={MAIN_NAV} />
    </DappProvider>
  );
}
