import { useGetAccountInfo, useGetLoginInfo } from '@elrondnetwork/dapp-core';

import Head from 'next/head';

import React, { useEffect, useState } from 'react';

import config from '../constants/config';
import { MAIN_NAV } from '../constants/nav';

import Navbar from './navbar';

export default function Header() {
  const [navItems, setNavItems] = useState([]);

  const { address } = useGetAccountInfo();
  const { isLoggedIn } = useGetLoginInfo();

  useEffect(() => {
    const items = MAIN_NAV.filter(item => !item.requiresAddress || !!address);
    setNavItems(items);
  }, [address]);

  return (
    <>
      <Head>
        <title>{config.projectName}</title>
        <meta name='description' content={config.projectDescription} />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='msapplication-config' content='/browserconfig.xml' />
        <meta name='theme-color' content='#0c1133' />
        <meta property='og:title' content={config.projectName} />
        <meta property='og:description' content={config.projectDescription} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={config.projectWebsiteUrl} />
        <meta property='og:image' content={config.projectOpenGraphUrl} />
      </Head>
      <Navbar navItems={navItems} />
    </>
  );
}
