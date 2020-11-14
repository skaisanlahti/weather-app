import React from "react";

function Weather(props) {
  const buildDisplay = (data, units) => {
    let elements = [];
    // main fields
    if (data.name) {
      elements.push(<h2 key={data.name}>{data.name}</h2>);
    }
    if (data.main.temp !== undefined) {
      const temp = data.main.temp.toFixed(0);
      elements.push(
        <h1>
          {temp} {units === "metric" ? "°C" : "°F"}
        </h1>
      );
    }
    if (data.weather[0].description) {
      elements.push(<h3>{data.weather[0].description}.</h3>);
    }

    // additional info that might or might not be in the API response
    if (data.clouds.all !== undefined) {
      elements.push(<p>Clouds: {data.clouds.all}%</p>);
    }
    if (data.wind.speed !== undefined) {
      elements.push(
        <p>
          Wind: {data.wind.speed} {units === "metric" ? "m/s" : "mph"}
        </p>
      );
    }
    if (data["rain.1h"] !== undefined) {
      elements.push(<p>Rain: {data["rain.1h"]}</p>);
    }
    if (data["snow.1h"] !== undefined) {
      elements.push(<p>Snow: {data["snow.1h"]}</p>);
    }
    if (data.sys.sunrise !== undefined) {
      const time = new Date(data.sys.sunrise * 1000);
      const timeStr = time.toLocaleTimeString();
      elements.push(<p>Sunrise: {timeStr}</p>);
    }
    if (data.sys.sunset !== undefined) {
      const time = new Date(data.sys.sunset * 1000);
      const timeStr = time.toLocaleTimeString();
      elements.push(<p>Sunset: {timeStr}</p>);
    }
    return elements;
  };

  if (props.data) {
    const elements = buildDisplay(props.data, props.units);
    return <div className="weather">{elements}</div>;
  }
  return null;
}

export default Weather;
