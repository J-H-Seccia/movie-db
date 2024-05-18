import React, { useEffect } from 'react';
import WebFont from 'webfontloader';

const FontLoader = ({ fonts }) => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: fonts,
      },
    });
  }, [fonts]);

  // You can optionally render a loading indicator here
  return null;
};

export default FontLoader;
