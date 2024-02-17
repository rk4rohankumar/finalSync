// WorldClockPage.jsx

import React, { useState, useEffect } from 'react';
import '../App.css';

const WorldClockPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCountry, setSelectedCountry] = useState(['Asia/Kolkata']);
  const [timezones, setTimezones] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log('Initial selectedCountry:', selectedCountry);
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetch('http://worldtimeapi.org/api/timezone')
      .then((response) => response.json())
      .then((data) => setTimezones(data))
      .catch((error) => console.error('Error fetching timezones:', error));

    return () => clearInterval(interval);
  }, []);

  const getFormattedTime = (timezone) => {
    return currentTime.toLocaleTimeString('en-US', { timeZone: timezone });
  };

  const getFormattedDate = (timezone) => {
    return currentTime.toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getGMTOffset = (timezone) => {
    const options = { timeZone: timezone, timeZoneName: 'short' };
    const timeZoneName = new Intl.DateTimeFormat('en-us', options).format();
    const [_, gmtOffset] = timeZoneName.split(' ');
    return `${gmtOffset}`;
  };

  const handleCountryClick = (timezone) => {
    setSelectedCountry(timezone);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    const matchingTimezones = timezones.filter((timezone) =>
      timezone.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTimezones(matchingTimezones);
  };

  const resetSearch = () => {
    setSearchQuery('');
    fetch('http://worldtimeapi.org/api/timezone')
      .then((response) => response.json())
      .then((data) => setTimezones(data))
      .catch((error) => console.error('Error fetching timezones:', error));
  };

  return (
    <div id="container">
      <div id="searchContainer">
        <input
          type="text"
          placeholder="Search timezone..."
          id="searchInput"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
        <button onClick={resetSearch}>Reset</button>
      </div>
      <div id="digitalClock">
        <p id="time">{getFormattedTime(selectedCountry)}</p>
        <p id="details">{getFormattedDate(selectedCountry)}</p>
        <p id="countryLabel"> {getGMTOffset(selectedCountry)}</p>
      </div>
      <div id="listContainer">
        <div id="labels">
          <div className="labelItem">
            <p>Country Name</p>
          </div>
          <div className="labelItem">
            <p>Time</p>
          </div>
          <div className="labelItem">
            <p>Date</p>
          </div>
          <div className="labelItem">
            <p>GMT</p>
          </div>
        </div>
        {timezones.map((timezone) => (
          <div key={timezone} className="listItem" onClick={() => handleCountryClick(timezone)}>
            <div className="rowContent">
              <div className="column">
                <p>{timezone}</p>
              </div>
              <div className="column">
                <p>{getFormattedTime(timezone)}</p>
              </div>
              <div className="column">
                <p>{getFormattedDate(timezone)}</p>
              </div>
              <div className="column">
                <p>{getGMTOffset(timezone)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClockPage;
