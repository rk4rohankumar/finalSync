// Header.jsx

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header-outer">
    <div className="header">
      <ul className="clock-list">
        <Link to="/">
          <li className="clock-list-item">
            <span className="link-style">Clock</span>
          </li>
        </Link>
        <Link to="/stopwatch">
          <li className="clock-list-item">
            <span className="link-style">StopWatch</span>
          </li>
        </Link>
        <Link to="/timer">
          <li className="clock-list-item">
            <span className="link-style">Timer</span>
          </li>
        </Link>
        <Link to="/worldclock">
          <li className="clock-list-item">
            <span className="link-style">World Clock</span>
          </li>
        </Link>
      </ul>
    </div>
    </div>
  );
};

export default Header;
