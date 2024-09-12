document.getElementById('calculateBtn').addEventListener('click', function () {
    const propertyValue = document.getElementById('propertyValue').value;
    const commissionRate = document.getElementById('commissionRate').value;

    if (propertyValue && commissionRate) {
        const commission = (propertyValue * (commissionRate / 100)).toFixed(2);
        document.getElementById('result').innerText = `La comisión de la inmobiliaria será de: ${commission} COP.`;
    } else {
        document.getElementById('result').innerText = 'Por favor, ingresa ambos valores.';
    }
});
