document.addEventListener(
    'DOMContentLoaded',
    () => {


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


    if (!savedOrder) {

        window.location.href =
            '../../index.html';

        return;

    }


    let order;

    try {

        order =
            JSON.parse(savedOrder);

    } catch (error) {

        sessionStorage.removeItem(
            'vilataxi_current_order'
        );

        window.location.href =
            '../../index.html';

        return;

    }


    if (
        !order.driver ||
        !order.id
    ) {

        window.location.href =
            '../../index.html';

        return;

    }


    /* ==========================================
       ELEMENTOS
    ========================================== */

    const driverAvatar =
        document.getElementById(
            'driverAvatar'
        );


    const driverName =
        document.getElementById(
            'driverName'
        );


    const driverPhone =
        document.getElementById(
            'driverPhone'
        );


    const orderId =
        document.getElementById(
            'orderId'
        );


    const transportName =
        document.getElementById(
            'transportName'
        );


    const transportImage =
    document.getElementById(
        'transportImage'
    );


    const callButton =
        document.getElementById(
            'callButton'
        );


    const messageButton =
        document.getElementById(
            'messageButton'
        );


    const whatsappButton =
        document.getElementById(
            'whatsappButton'
        );


    /* ==========================================
       DADOS
    ========================================== */

    const driver =
        order.driver;


    const transport =
        order.transport;


    const phone =
        String(driver.phone)
            .replace(/\D/g, '');


    const formattedPhone =
        phone.length >= 12
            ? `+${phone}`
            : phone;


    /* ==========================================
       PREENCHER MOTORISTA
    ========================================== */

    driverAvatar.src =
        driver.avatar;


    driverAvatar.alt =
        driver.name;


    driverName.textContent =
        driver.name;


    driverPhone.textContent =
        formattedPhone;


    /* ==========================================
       PEDIDO
    ========================================== */

    orderId.textContent =
    order.id;


transportName.textContent =
    transport.name;


/* ==========================================
   IMAGEM DO TRANSPORTE
========================================== */

transportImage.src =
    `../../images/${transport.image}`;

transportImage.alt =
    transport.name;


    /* ==========================================
       CHAMAR
    ========================================== */

    callButton.href =
        `tel:${formattedPhone}`;


    /* ==========================================
       MENSAGEM
    ========================================== */

    messageButton.href =
        `sms:${formattedPhone}`;


    /* ==========================================
       WHATSAPP
    ========================================== */

    whatsappButton.href =
        `https://wa.me/${phone}`;


    /* ==========================================
       AJUDA
    ========================================== */

    const helpButton =
        document.getElementById(
            'helpButton'
        );


    const helpModal =
        document.getElementById(
            'helpModal'
        );


    const closeHelp =
        document.getElementById(
            'closeHelp'
        );


    const helpOk =
        document.getElementById(
            'helpOk'
        );


    function openHelp() {

        helpModal.classList.add(
            'show'
        );

        helpModal.setAttribute(
            'aria-hidden',
            'false'
        );

    }


    function closeHelpModal() {

        helpModal.classList.remove(
            'show'
        );

        helpModal.setAttribute(
            'aria-hidden',
            'true'
        );

    }


    helpButton.addEventListener(
        'click',
        openHelp
    );


    closeHelp.addEventListener(
        'click',
        closeHelpModal
    );


    helpOk.addEventListener(
        'click',
        closeHelpModal
    );


    helpModal.addEventListener(
        'click',
        event => {

            if (
                event.target ===
                helpModal
            ) {

                closeHelpModal();

            }

        }
    );


    /* ==========================================
       AVISO IOS
    ========================================== */

    const iosNotice =
        document.getElementById(
            'iosNotice'
        );


    const closeIosNotice =
        document.getElementById(
            'closeIosNotice'
        );


    closeIosNotice.addEventListener(
        'click',
        () => {

            iosNotice.style.display =
                'none';

        }
    );


    /* ==========================================
       MAPA
    ========================================== */

    const mapButton =
        document.getElementById(
            'mapButton'
        );


    const mapModal =
        document.getElementById(
            'mapModal'
        );


    const closeMap =
        document.getElementById(
            'closeMap'
        );


    const mapOk =
        document.getElementById(
            'mapOk'
        );


    function openMap() {

        mapModal.classList.add(
            'show'
        );

        mapModal.setAttribute(
            'aria-hidden',
            'false'
        );

    }


    function closeMapModal() {

        mapModal.classList.remove(
            'show'
        );

        mapModal.setAttribute(
            'aria-hidden',
            'true'
        );

    }


    mapButton.addEventListener(
        'click',
        openMap
    );


    closeMap.addEventListener(
        'click',
        closeMapModal
    );


    mapOk.addEventListener(
        'click',
        closeMapModal
    );


    mapModal.addEventListener(
        'click',
        event => {

            if (
                event.target ===
                mapModal
            ) {

                closeMapModal();

            }

        }
    );


    /* ==========================================
       MOTORISTA NÃO CHEGA
    ========================================== */

    const driverProblemButton =
        document.getElementById(
            'driverProblemButton'
        );


    const driverProblemModal =
        document.getElementById(
            'driverProblemModal'
        );


    const closeDriverProblem =
        document.getElementById(
            'closeDriverProblem'
        );


    const supportWhatsapp =
        document.getElementById(
            'supportWhatsapp'
        );


    function openDriverProblem() {

        driverProblemModal.classList.add(
            'show'
        );

        driverProblemModal.setAttribute(
            'aria-hidden',
            'false'
        );

    }


    function closeDriverProblemModal() {

        driverProblemModal.classList.remove(
            'show'
        );

        driverProblemModal.setAttribute(
            'aria-hidden',
            'true'
        );

    }


    driverProblemButton.addEventListener(
        'click',
        openDriverProblem
    );


    closeDriverProblem.addEventListener(
        'click',
        closeDriverProblemModal
    );


    driverProblemModal.addEventListener(
        'click',
        event => {

            if (
                event.target ===
                driverProblemModal
            ) {

                closeDriverProblemModal();

            }

        }
    );


    supportWhatsapp.href =
        `https://wa.me/${supportNumber.replace(/\D/g, '')}`;


    /* ==========================================
       COPIAR ID
    ========================================== */

    const copyOrderButton =
        document.getElementById(
            'copyOrderButton'
        );


    copyOrderButton.addEventListener(
        'click',
        async () => {

            try {

                await navigator.clipboard.writeText(
                    order.id
                );

                copyOrderButton.querySelector(
                    'span'
                ).textContent =
                    'ID copiado!';

                setTimeout(
                    () => {

                        copyOrderButton.querySelector(
                            'span'
                        ).textContent =
                            'Copiar ID';

                    },
                    1500
                );

            } catch (error) {

                alert(
                    `ID do pedido: ${order.id}`
                );

            }

        }
    );


    /* ==========================================
       PARTILHAR
    ========================================== */

    const shareButton =
        document.getElementById(
            'shareButton'
        );


    shareButton.addEventListener(
        'click',
        async () => {

            const shareText =
                `Meu pedido VilaTáxi\nID: ${order.id}\nMotorista: ${driver.name}`;


            if (
                navigator.share
            ) {

                try {

                    await navigator.share({

                        title:
                            'Pedido VilaTáxi',

                        text:
                            shareText,

                        url:
                            window.location.href

                    });

                } catch (error) {

                    // Utilizador cancelou

                }

            } else {

                try {

                    await navigator.clipboard.writeText(
                        shareText
                    );

                    alert(
                        'Informações do pedido copiadas.'
                    );

                } catch (error) {

                    alert(
                        shareText
                    );

                }

            }

        }
    );


    /* ==========================================
       CANCELAR
    ========================================== */

    const cancelButton =
        document.getElementById(
            'cancelButton'
        );


    cancelButton.addEventListener(
        'click',
        () => {

            const confirmed =
                confirm(
                    'Tem certeza que deseja cancelar este pedido?'
                );


            if (!confirmed) {
                return;
            }


            order.status =
                'Cancelado';


            sessionStorage.setItem(
                'vilataxi_current_order',
                JSON.stringify(order)
            );


            alert(
                'Pedido cancelado.'
            );


            window.location.href =
                '../../index.html';

        }
    );


});