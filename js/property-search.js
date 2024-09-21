document.addEventListener('DOMContentLoaded', function() {
  let properties = [];

  fetch('/js/properties.json')
    .then(response => response.json())
    .then(data => {
      properties = data;
      initializeSearch();
    });

  function initializeSearch() {
    const searchForm = document.getElementById('property-search-form');
    const resultsContainer = document.getElementById('search-results');

    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const minPrice = document.getElementById('min-price').value;
      const maxPrice = document.getElementById('max-price').value;
      const propertyType = document.getElementById('property-type').value;
      const listingType = document.getElementById('listing-type').value;

      const filteredProperties = properties.filter(property => {
        return (
          (!minPrice || property.precio >= parseInt(minPrice)) &&
          (!maxPrice || property.precio <= parseInt(maxPrice)) &&
          (!propertyType || property.clase === propertyType) &&
          (!listingType || property.layout === listingType)
        );
      });

      displayResults(filteredProperties);
    });
  }

  function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
      resultsContainer.innerHTML = '<p>No se encontraron propiedades que coincidan con los criterios de búsqueda.</p>';
      return;
    }

    results.forEach(property => {
      const propertyElement = document.createElement('div');
      propertyElement.classList.add('property-item');
      propertyElement.innerHTML = `
        <h4>${property.title}</h4>
        <p>Precio: $${property.precio.toLocaleString()}</p>
        <p>Tipo: ${property.clase}</p>
        <p>Área: ${property.area}</p>
        <a href="${property.url}" target="_blank" class="boton boton2">Ver detalles</a>
        <hr>
      `;
      resultsContainer.appendChild(propertyElement);
    });
  }
});