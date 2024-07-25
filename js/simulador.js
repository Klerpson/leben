function calculateExpenses() {
  const propertyValue = parseFloat(document.getElementById('propertyValue').value);

  if (isNaN(propertyValue) || propertyValue <= 0) {
      alert('Por favor, ingrese un valor válido del inmueble.');
      return;
  }

  const withholdingTaxRate = 0.01; // Retención en la fuente
  const registryBeneficenceRate = 0.0167; // Beneficencia y registro
  const notaryFeeRate = 0.003; // Gastos notariales
  const certificatesFee = 20000; // Certificado de libertad
  const iva = 114000; // IVA

  const withholdingTax = propertyValue * withholdingTaxRate;
  const registryBeneficenceFees = propertyValue * registryBeneficenceRate;
  const notaryFees = propertyValue * notaryFeeRate;
  const totalFees = withholdingTax + registryBeneficenceFees + notaryFees + certificatesFee + iva;

  document.getElementById('notaryFees').innerText = notaryFees.toLocaleString('es-CO');
  document.getElementById('registryFees').innerText = registryBeneficenceFees.toLocaleString('es-CO');
  document.getElementById('certificatesFees').innerText = certificatesFee.toLocaleString('es-CO');
  document.getElementById('totalFees').innerText = totalFees.toLocaleString('es-CO');

  document.getElementById('results').classList.remove('hidden');
}
