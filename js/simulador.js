function calculateExpenses() {
  const propertyValue = parseFloat(document.getElementById('propertyValue').value);

  if (isNaN(propertyValue) || propertyValue <= 0) {
      alert('Por favor, ingrese un valor válido del inmueble.');
      return;
  }

  const notaryFeeRate = 0.002; 
  const registryFeeRate = 0.01;
  const certificatesFee = 50000;

  const notaryFees = propertyValue * notaryFeeRate;
  const registryFees = propertyValue * registryFeeRate;
  const totalFees = notaryFees + registryFees + certificatesFee;

  document.getElementById('notaryFees').innerText = notaryFees.toLocaleString('es-CO');
  document.getElementById('registryFees').innerText = registryFees.toLocaleString('es-CO');
  document.getElementById('certificatesFees').innerText = certificatesFee.toLocaleString('es-CO');
  document.getElementById('totalFees').innerText = totalFees.toLocaleString('es-CO');

  document.getElementById('results').classList.remove('hidden');
}
