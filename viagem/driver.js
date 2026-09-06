/* ==========================================
   ATUALIZAR LOCALIZAÇÃO DO MOTORISTA
========================================== */

function updateDriverLocation(driver) {

    if (
        !driver ||
        typeof driver.lat !== 'number' ||
        typeof driver.lng !== 'number'
    ) {

        driverLocation.textContent =
            'Localização indisponível';

        driverCoordinates.textContent =
            'Coordenadas indisponíveis';

        copyCoordinates.disabled =
            true;

        return;

    }


    driverLocation.textContent =
        `Motorista: ${driver.name}`;


    driverCoordinates.textContent =
        `${driver.lat.toFixed(6)}, ${driver.lng.toFixed(6)}`;


    copyCoordinates.disabled =
        false;

}
