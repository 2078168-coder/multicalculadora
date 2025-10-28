function calcularIVA() {
    const monto = parseFloat(document.getElementById('input-monto').value);
    const iva = parseFloat(document.getElementById('input-iva').value);

    if (isNaN(monto) || isNaN(iva)) {
        document.getElementById('resultado-iva').innerText = "Ingresa valores válidos";
        return;
    }

    const montoIVA = monto * (iva / 100);
    document.getElementById('display-iva').innerText = montoIVA.toFixed(2);
    document.getElementById('resultado-iva').innerText = `IVA: ${montoIVA.toFixed(2)}`;
}

function calcularTotal() {
    const monto = parseFloat(document.getElementById('input-monto').value);
    const iva = parseFloat(document.getElementById('input-iva').value);

    if (isNaN(monto) || isNaN(iva)) {
        document.getElementById('resultado-iva').innerText = "Ingresa valores válidos";
        return;
    }

    const montoIVA = monto * (iva / 100);
    const total = monto + montoIVA;
    document.getElementById('display-iva').innerText = total.toFixed(2);
    document.getElementById('resultado-iva').innerText = `Total con IVA: ${total.toFixed(2)}`;
}

function limpiarIVA() {
    document.getElementById('input-monto').value = '';
    document.getElementById('input-iva').value = '13';
    document.getElementById('display-iva').innerText = '0';
    document.getElementById('resultado-iva').innerText = '';
}
