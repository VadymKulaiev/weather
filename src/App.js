import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [data, setData] = useState({});
  const [city, setCity] = useState('');

  const key = '2f5b187c31444642d9d3dc99178ec345';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}&lang=ua`;

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=kyiv&units=metric&appid=${key}&lang=ua`)
    .then(res => setData(res.data))
    .catch(err => console.log(err));
  }, [])

  const onSearchWeather = (e) => {
    if (e.key === 'Enter') {
      axios.get(url)
        .then(response => setData(response.data))
        .catch(err => console.log(err))
      setCity('');
    }
  }

  return (
    <div className='app'>
      <div className='inp-field'>
        <input type='text' placeholder='Enter Location'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={onSearchWeather}
        />
      </div>

      <div className='container'>
        {data.name !== undefined && (
          <>
            <div className='header'>
              <div className='city'>
                <p>{data.name}</p>
              </div>
            </div>
            <div className='temp'>
              {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
            </div>
            <div className='minmax'>
              <div className='min'>
              <p>{data.main.temp_min.toFixed()}°C</p>
              <p>мін</p>
              </div>
              <div className='max'>
              <p>{data.main.temp_max.toFixed()}°C</p>
              <p>мах</p>
              </div>
            </div>
            <div className='desc'>
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
            <div className='footer'>
              <div className='feels'>
                {data.main ? <p className='bolt'>{data.main.feels_like.toFixed()}°C</p> : null}
                <p>Відчувається як </p>
              </div>
              <div className='humidity'>
                {data.main && <p className='bolt'> {data.main.humidity}%</p>}
                <p>Вологість</p>
              </div>
              <div className='wind'>
                {data.wind && <p className='bolt'> {data.wind.speed} м/с</p>}
                <p>Вітер</p>
              </div> 
             
             
            </div>
            <div className='footer'>
            <div className='pressure'>
                {data.main && <p className='bolt'>Тиск {data.main.pressure} мм</p>}
              </div>
            </div>

          </>
        )}



      </div>
    </div>
  )
}

export default App;
