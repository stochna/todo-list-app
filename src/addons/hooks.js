import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
import isEqual from 'lodash/isEqual';

const useDeepEffect = (callback, depArray) => {
  const isFirstRender = useRef(true);
  const prevDepArray = useRef(depArray);
  useEffect(() => {
    const isSame = prevDepArray.current.every((obj, idx) => isEqual(obj, depArray[idx]));
    if (isFirstRender.current || !isSame) {
      callback();
    };
    isFirstRender.current = false;
    prevDepArray.current = depArray;
  }, depArray)
};

const useDeviceSize = setDevice => {
  useLayoutEffect(() => {
    const updateDevice = () => {
      let device = null;

      if (window.matchMedia('screen and (max-width: 600px)').matches) {
        device = 'mob';
      };
      if (window.matchMedia('screen and (min-width: 600px)').matches) {
        device = 'tablet';
      };
      if (window.matchMedia('screen and (min-width: 1000px)').matches) {
        device = 'desktop';
      };

      setDevice(device);
    };

    updateDevice();

    window.addEventListener('resize', updateDevice);
  }, []);
};

const useSystemTheme = setTheme => {
  useLayoutEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = matchMedia.matches;

    const updateTheme = () => {
      if (isDark) {
        setTheme('dark');
      } else {
        setTheme('light');
      };
    };

    updateTheme();

    matchMedia.addEventListener('change', updateTheme);
  }, []);
};

export {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useDeepEffect,
  useDeviceSize,
  useSystemTheme,
};
