document.getElementById('getWeatherBtn').addEventListener('click', () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
      document.getElementById('weatherInfo').innerHTML = "Geolocation no es soportado por este navegador.";
  }
});

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Datos de clima simulados
  const simulatedWeatherData = {
      temperature: (20 + Math.random() * 10).toFixed(1),
      conditions: ['Soleado', 'Nublado', 'Lluvia', 'Tormenta', 'Nieve'][Math.floor(Math.random() * 5)]
  };

  document.getElementById('weatherInfo').innerHTML = `
      <p>Latitud: ${lat.toFixed(2)}, Longitud: ${lon.toFixed(2)}</p>
      <p>Temperatura: ${simulatedWeatherData.temperature} °C</p>
      <p>Condiciones: ${simulatedWeatherData.conditions}</p>
  `;
}

function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          document.getElementById('weatherInfo').innerHTML = "Usuario denegó la solicitud de Geolocalización.";
          break;
      case error.POSITION_UNAVAILABLE:
          document.getElementById('weatherInfo').innerHTML = "Información de ubicación no disponible.";
          break;
      case error.TIMEOUT:
          document.getElementById('weatherInfo').innerHTML = "La solicitud para obtener la ubicación ha expirado.";
          break;
      case error.UNKNOWN_ERROR:
          document.getElementById('weatherInfo').innerHTML = "Un error desconocido ocurrió.";
          break;
  }
}
