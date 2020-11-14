import React, { useState, useEffect } from "react";
import Weather from "./components/Weather";
import Search from "./components/Search";
import History from "./components/History";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;

  // search fields
  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState(false);
  const [searchUnits, setSearchUnits] = useState("metric");
  const [history, setHistory] = useState([]);
  const historySize = 9;

  // weather fields
  const [units, setUnits] = useState("metric");
  const [data, setData] = useState(null);

  // methods
  const fetchWeatherData = async (city, units) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`,
        { mode: "cors" }
      );
      const json = await response.json();
      if (json.cod === 200) {
        console.log(json);
        setData(json);
        setSearchError(false);
        setUnits(units);
        updateHistory(history, json.name);
      } else {
        setSearchError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateHistory = (history, newLocation) => {
    let newHistory = [...history];
    if (newHistory.includes(newLocation)) return;
    if (newHistory.length >= historySize) {
      newHistory.splice(historySize - 1, 1);
    }
    newHistory.unshift(newLocation);
    setHistory(newHistory);
    saveHistory(newHistory);
  };

  const saveHistory = (history) => {
    localStorage.setItem("history", JSON.stringify(history));
  };

  const loadHistory = () => {
    if (localStorage.getItem("history")) {
      const localHistory = JSON.parse(localStorage.getItem("history"));
      setHistory(localHistory);
    }
  };

  // load old history on start up
  useEffect(() => {
    loadHistory();
  }, []);

  // form controls
  const handleChange = (event) => {
    if (event.target.name === "city") setSearchTerm(event.target.value);
    if (event.target.name === "units") setSearchUnits(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData(searchTerm, searchUnits);
  };

  const handleHistoryClick = (event) => {
    fetchWeatherData(event.target.innerText, searchUnits);
  };

  return (
    <div className="app">
      <header>
        <h1>Weather Now</h1>
        <Search
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchError={searchError}
          searchTerm={searchTerm}
        />
      </header>
      <main className="results">
        <Weather data={data} units={units} />
        <History history={history} handleHistoryClick={handleHistoryClick} />
      </main>
      <footer>
        <a href="https://openweathermap.org/">
          Powered by Open Weather Map API
        </a>
      </footer>
    </div>
  );
}

export default App;
