import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AnalogClockLayout from './AnalogClockLayout';
import Styles from './styles';
import { cssTransform, updateTime } from './util';
import { dark } from './themes';

const AnalogClock = ({ theme, width, gmtOffset, showSmallTicks }) => {
  const [time, setTime] = useState({ seconds: 0, minutes: 0, hour: 0 });
  const [styles, setStyles] = useState(cssTransform(Styles, { theme, width }));

  useEffect(() => {
    const date = initializeTime(gmtOffset);
    setTime({ seconds: date[2], minutes: date[1], hour: date[0] });
  }, [gmtOffset]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevState) => updateTime(prevState));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const initializeTime = (gmtOffset) => {
    const now = new Date();
    if (gmtOffset && gmtOffset !== 'undefined') {
      const offsetNow = new Date(now.valueOf() + parseFloat(gmtOffset) * 1000 * 60 * 60);
      return [offsetNow.getUTCHours(), offsetNow.getUTCMinutes(), offsetNow.getUTCSeconds()];
    } else {
      return [now.getHours(), now.getMinutes(), now.getSeconds()];
    }
  };

  useEffect(() => {
    setStyles(cssTransform(Styles, { theme, width }));
  }, [theme, width]);

  return <div className='analogcontainer'>
    <AnalogClockLayout {...time} styles={styles} showSmallTicks={showSmallTicks} />
  </div>;
};

AnalogClock.propTypes = {
  theme: PropTypes.shape({
    background: PropTypes.string.isRequired,
    border: PropTypes.string.isRequired,
    center: PropTypes.string.isRequired,
    seconds: PropTypes.string.isRequired,
    minutes: PropTypes.string.isRequired,
    hour: PropTypes.string.isRequired,
    tick: PropTypes.string.isRequired,
  }),
  width: PropTypes.number,
  gmtOffset: PropTypes.string,
  showSmallTicks: PropTypes.bool,
};

AnalogClock.defaultProps = {
  theme: dark,
  width: 400,
  showSmallTicks: true,
};

export default AnalogClock;
