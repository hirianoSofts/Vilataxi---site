document.addEventListener(
    'DOMContentLoaded',
    () => {

        /* ==========================================
           ELEMENTOS SOS
        ========================================== */

        const sosContainer =
            document.getElementById(
                'sosContainer'
            );


        const sosButton =
            document.getElementById(
                'sosButton'
            );


        const sosSupportButton =
            document.getElementById(
                'sosSupportButton'
            );


        const shareLocationButton =
            document.getElementById(
                'shareLocationButton'
            );


        const sosDriverButton =
            document.getElementById(
                'sosDriverButton'
            );


        /* ==========================================
           VERIFICAR ELEMENTOS
        ========================================== */

        if (
            !sosContainer ||
            !sosButton
        ) {

            console.error(
                'Elementos do SOS não encontrados.'
            );

            return;

        }


        /* ==========================================
           SUPORTE
        ========================================== */

        const supportNumber =
            '258XXXXXXXXX';


        /* ==========================================
           RECUPERAR PEDIDO
        ========================================== */

        const savedOrder =
            sessionStorage.getItem(
                'vilataxi_current_order'
            );


        let formattedPhone = '';
        let phone = '';


        if (savedOrder) {

            try {

                const order =
                    JSON.parse(savedOrder);


                if (
                    order.driver &&
                    order.driver.phone
                ) {

                    phone =
                        String(
                            order.driver.phone
                        ).replace(
                            /\D/g,
                            ''
                        );


                    formattedPhone =
                        phone.length >= 12
                            ? `+${phone}`
                            : phone;

                }

            } catch (error) {

                console.error(
                    'Erro ao recuperar o pedido:',
                    error
                );

            }

        }


        /* ==========================================
           ABRIR / FECHAR SOS
        ========================================== */

        sosButton.addEventListener(
            'click',
            () => {

                const isOpen =
                    sosContainer.classList.toggle(
                        'open'
                    );


                sosButton.setAttribute(
                    'aria-expanded',
                    String(isOpen)
                );


                /*
                 * O HTML possui .sos-text,
                 * não .sos-icon.
                 */

                const sosText =
                    sosButton.querySelector(
                        '.sos-text'
                    );


                if (sosText) {

                    sosText.textContent =
                        isOpen
                            ? '×'
                            : 'SOS';

                }

            }
        );


        /* ==========================================
           SUPORTE SOS
        ========================================== */

        if (sosSupportButton) {

            sosSupportButton.addEventListener(
                'click',
                () => {

                    const cleanSupport =
                        supportNumber.replace(
                            /\D/g,
                            ''
                        );


                    if (
                        !cleanSupport ||
                        cleanSupport.includes(
                            'XXXXXXXX'
                        )
                    ) {

                        alert(
                            'O contacto do suporte ainda não está configurado.'
                        );

                        return;

                    }


                    window.open(
                        `https://wa.me/${cleanSupport}`,
                        '_blank'
                    );

                }
            );

        }


        /* ==========================================
           LIGAR AO MOTORISTA
        ========================================== */

        if (sosDriverButton) {

            if (formattedPhone) {

                sosDriverButton.href =
                    `tel:${formattedPhone}`;

            } else {

                sosDriverButton.href =
                    '#';


                sosDriverButton.addEventListener(
                    'click',
                    event => {

                        event.preventDefault();


                        alert(
                            'O contacto do motorista não está disponível.'
                        );

                    }
                );

            }

        }


        /* ==========================================
           PARTILHAR LOCALIZAÇÃO
        ========================================== */

        if (shareLocationButton) {

            shareLocationButton.addEventListener(
                'click',
                () => {

                    if (
                        !navigator.geolocation
                    ) {

                        alert(
                            'O seu dispositivo não suporta localização.'
                        );

                        return;

                    }


                    const textElement =
                        shareLocationButton.querySelector(
                            'span:last-child'
                        );


                    if (textElement) {

                        textElement.innerHTML = `
                            A obter localização...
                            <small>Aguarde um momento</small>
                        `;

                    }


                    navigator.geolocation.getCurrentPosition(

                        async position => {

                            const latitude =
                                position.coords.latitude;


                            const longitude =
                                position.coords.longitude;


                            const locationUrl =
                                `https://www.google.com/maps?q=${latitude},${longitude}`;


                            const shareText =
                                `Preciso de ajuda. A minha localização atual é:\n${locationUrl}`;


                            try {

                                if (
                                    navigator.share
                                ) {

                                    await navigator.share({

                                        title:
                                            'Localização SOS - VilaTáxi',

                                        text:
                                            shareText,

                                        url:
                                            locationUrl

                                    });

                                } else if (
                                    navigator.clipboard
                                ) {

                                    await navigator.clipboard.writeText(
                                        locationUrl
                                    );


                                    alert(
                                        'Localização copiada. Pode enviá-la ao seu contacto de emergência.'
                                    );

                                } else {

                                    alert(
                                        locationUrl
                                    );

                                }

                            } catch (error) {

                                /*
                                 * O utilizador cancelou
                                 * a partilha.
                                 */

                            }


                            if (textElement) {

                                textElement.innerHTML = `
                                    Partilhar localização
                                    <small>Enviar a sua localização</small>
                                `;

                            }

                        },


                        error => {

                            if (textElement) {

                                textElement.innerHTML = `
                                    Partilhar localização
                                    <small>Enviar a sua localização</small>
                                `;

                            }


                            let message =
                                'Não foi possível obter a sua localização.';


                            if (
                                error.code ===
                                error.PERMISSION_DENIED
                            ) {

                                message =
                                    'Permita o acesso à localização para utilizar esta função.';

                            }


                            alert(
                                message
                            );

                        },


                        {
                            enableHighAccuracy:
                                true,

                            timeout:
                                10000,

                            maximumAge:
                                0

                        }

                    );

                }
            );

        }

    }
);