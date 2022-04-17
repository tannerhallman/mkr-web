import { useLottie } from 'lottie-react';

import loadingLottieFile from './animation/cute-dog-loading-animation-for-website.json';

export default function Loader() {
  const options = {
    animationData: loadingLottieFile,
    loop: true,
    autoplay: true
  };

  const { View } = useLottie(options);

  return View;
}
