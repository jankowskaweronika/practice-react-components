import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.querySelector('#root'));
const styles = {
  container: {
    backgroundColor: '#f0f3f5',
    color: '#333',
    padding: '20px',
    borderRadius: '5px',
    margin: '0 auto',
    textAlign: 'center',
    width: '700px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    color: '#2a6a8e',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #b3d6e6',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#2a6a8e',
    color: 'white',
    cursor: 'pointer',
    width: '200px',
    margin: '0 auto',
  },
  weatherInfo: {
    marginTop: '20px',
  },
};
class Weather extends React.Component {
  state = {
    data: null,
    lat: '',
    lng: '',
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { lat, lng } = this.state;
    const key = 'b8e59f222fce4663ae7bdc7a6a382b01';

    fetch(
      `https://api.weatherbit.io/v2.0/current?key=${key}&lat=${lat}&lon=${lng}&lang=pl`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        this.setState({ data: jsonData.data[0] });
      })
      .catch((error) => {
        console.error(
          'Wystąpił błąd podczas pobierania danych pogodowych:',
          error
        );
      });
  };

  render() {
    const { data, lat, lng } = this.state;

    return (
      <div style={styles.container}>
        <form onSubmit={this.handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Szerokość geograficzna:
            <input
              type="text"
              name="lat"
              value={lat}
              onChange={this.handleInputChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Długość geograficzna:
            <input
              type="text"
              name="lng"
              value={lng}
              onChange={this.handleInputChange}
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.button}>
            Pokaż pogodę
          </button>
        </form>
        <div style={styles.weatherInfo}>
          {data ? (
            <div>
              <p>Miasto: {data.city_name}</p>
              <p>Temperatura: {data.temp}°C</p>
              <p>Opis: {data.weather.description}</p>
              <p>Wiatr: {data.wind_spd} m/s</p>
              <p>Ciśnienie: {data.pressure} hPa</p>
              <p>Wilgotność: {data.rh}%</p>
              <p>Indeks UV: {data.uv}</p>
              <p>Widoczność: {data.visibility} m</p>
              <p>Wschód słońca: {data.sunrise}</p>
              <p>Zachód słońca: {data.sunset}</p>
              <p>Opady: {data.precip} mm </p>
              <p>Opady śniegu: {data.snow} mm</p>
              <p>Zachmurzenie: {data.clouds}%</p>
            </div>
          ) : (
            <p>Wprowadź współrzędne, aby uzyskać informacje o pogodzie.</p>
          )}
        </div>
      </div>
    );
  }
}
root.render(<Weather />);