import React from 'react';
import PropTypes from 'prop-types';

const renderNotches = ({ smallTick, largeTick }, showSmallTicks) => {
  const notches = [];
  for (let i = 0; i < 60; i++) {
    let style = Object.assign({}, i % 5 === 0 ? largeTick : smallTick, {
      transform: `translateX(-50%) translateY(-100%) rotate(${i * 6}deg)`,
    });
    if (i % 5 !== 0 && !showSmallTicks) continue;
    notches.push(<span key={i} style={style} />);
  }
  return notches;
};

const AnalogClockLayout = ({ hour, minutes, seconds, styles, showSmallTicks }) => {
  // +1 to center align
  const secondStyle = Object.assign({}, styles.second, {
    transform: `translateX(-50%) translateY(-100%) rotate(${seconds * 6 + 1}deg)`,
  });
  // +1 to center align
  const minuteStyle = Object.assign({}, styles.minute, {
    transform: `translateX(-50%) translateY(-100%) rotate(${minutes * 6 + 1}deg)`,
  });
  // +1.5 to center align
  const hourStyle = Object.assign({}, styles.hour, {
    transform: `translateX(-50%) translateY(-100%) rotate(${hour * 30 + 1.5}deg)`,
  });

  return (
    <div style={styles.base}>
      <div data-testid="seconds" style={secondStyle}></div>
      <div data-testid="minutes" style={minuteStyle}></div>
      <div data-testid="hour" style={hourStyle}></div>
      <div style={styles.center}></div>
      {renderNotches(styles, showSmallTicks)}
    </div>
  );
};

AnalogClockLayout.propTypes = {
  hour: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  styles: PropTypes.shape({
    second: PropTypes.object.isRequired,
    minute: PropTypes.object.isRequired,
    hour: PropTypes.object.isRequired,
  }).isRequired,
  showSmallTicks: PropTypes.bool.isRequired,
};

export default AnalogClockLayout;
