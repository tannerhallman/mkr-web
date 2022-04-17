import React from 'react';

import TagManager from 'react-gtm-module';

import config from '../../constants/config';
export default function GoogleTagManager() {
  TagManager.initialize({
    gtmId: config.googleTagId
  });

  return null;
}
