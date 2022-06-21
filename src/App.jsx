import React, { useState } from "react";

const api = {
  key: `c16a9b99565d1acc520b2bec7e58a396`,
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="bg-slate-200">
      <div className="container ">
        {/* title */}
        <h2 className="font-mono text-5xl mb-20 font-bold">Weather Forcast</h2>
        <div className="form-control w-full max-w-xl mb-16">
          <input
            type="text"
            className="input input-primary "
            placeholder="Search city..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div className="border-2 p-4 rounded-xl flex gap-2 flex-col backdrop-blur-lg bg-gray-200 shadow-lg bg-opacity-50">
            {/* location */}
            <div>
              <h3 className="font-bold text-lg text-primary">
                {weather.name}, {weather.sys.country}
              </h3>
              <p className="text-sm text-gray-500">{dateBuilder(new Date())}</p>
            </div>

            <div className="mb-4 flex justify-center items-center gap-2">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              />
              {/* <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" /> */}
              <p className="text-lg capitalize">
                {weather.weather[0].description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 col gap-4 mt-4 gap-x-12">
              <div>
                <h4 className="text-gray-500 text-sm">Temperature</h4>
                <p className="text-4xl">{Math.round(weather.main.temp)}°c</p>
              </div>
              <div>
                <h4 className="text-gray-500 text-sm">Feels like</h4>
                <p className="text-4xl">{weather.main.feels_like}°c</p>
              </div>

              <div>
                <h4 className="text-gray-500 text-sm">Wind</h4>
                <p className="text-4xl">{weather.wind.speed} km/h</p>
              </div>

              <div>
                <h4 className="text-gray-500 text-sm">Humidity</h4>
                <p className="text-4xl">{weather.main.humidity} %</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
