document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       DADOS DAS CATEGORIAS
    ========================================== */

    const transportData = {

        txopela: {

            name: 'TXOPELA',

            description:
                'Motoristas de txopela disponíveis na sua região.',

            icon:
                'fi fi-rr-car-side'

        },


        eco: {

            name: 'CARRO ECO',

            description:
                'Motoristas de carro disponíveis na sua região.',

            icon:
                'fi fi-rr-car'

        },


        moto: {

            name: 'MOTOTAXI',

            description:
                'Mototaxistas disponíveis na sua região.',

            icon:
                'fi fi-rr-motorcycle'

        }

    };


    /* ==========================================
       MOTORISTAS DE EXEMPLO
       
       Estes dados serão posteriormente
       substituídos pelos dados do Firebase.
    ========================================== */

    const drivers = [

        {
            id: 1,

            name: 'Carlos Mucavele',

            phone: '258859123456',

            avatar:
                'https://i.pravatar.cc/150?img=12',

            category:
                'txopela',

            online:
                true

        },


        {
            id: 2,

            name: 'João Vilanculos',

            phone: '258841234562',

            avatar:
                'https://i.pravatar.cc/150?img=11',

            category:
                'txopela',

            online:
                true

        },


        {
            id: 3,

            name: 'Manuel Chivambo',

            phone: '258861234572',

            avatar:
                'https://i.pravatar.cc/150?img=33',

            category:
                'txopela',

            online:
                true

        },


        {
            id: 4,

            name: 'António Macamo',

            phone: '258871234582',

            avatar:
                'https://i.pravatar.cc/150?img=51',

            category:
                'eco',

            online:
                true

        },


        {
            id: 5,

            name: 'Fernando Matsinhe',

            phone: '258821234592',

            avatar:
                'https://i.pravatar.cc/150?img=68',

            category:
                'eco',

            online:
                true

        },


        {
            id: 6,

            name: 'Edson Nhancale',

            phone: '258851234562',

            avatar:
                'https://i.pravatar.cc/150?img=59',

            category:
                'moto',

            online:
                true

        },


        {
            id: 7,

            name: 'Nelson Chongo',

            phone: '258841234572',

            avatar:
                'https://i.pravatar.cc/150?img=14',

            category:
                'moto',

            online:
                true

        }

    ];


    /* ==========================================
       OBTER CATEGORIA DA URL
    ========================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const selectedTransport =
        params.get('transporte') ||
        'txopela';


    const category =
        transportData[selectedTransport] ||
        transportData.txopela;


    /* ==========================================
       ELEMENTOS
    ========================================== */

    const categoryName =
        document.getElementById(
            'categoryName'
        );


    const categoryDescription =
        document.getElementById(
            'categoryDescription'
        );


    const categoryIcon =
        document.getElementById(
            'categoryIcon'
        );


    const driversList =
        document.getElementById(
            'driversList'
        );


    const driverCount =
        document.getElementById(
            'driverCount'
        );


    const continueButton =
        document.getElementById(
            'continueButton'
        );


    const promotionButton =
        document.getElementById(
            'promotionButton'
        );


    const promotionModal =
        document.getElementById(
            'promotionModal'
        );


    const closePromotion =
        document.getElementById(
            'closePromotion'
        );


    const promotionOk =
        document.getElementById(
            'promotionOk'
        );


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


    const iosNotice =
        document.getElementById(
            'iosNotice'
        );


    const closeIosNotice =
        document.getElementById(
            'closeIosNotice'
        );


    /* ==========================================
       MOSTRAR CATEGORIA
    ========================================== */

    categoryName.textContent =
        category.name;


    categoryDescription.textContent =
        category.description;


    categoryIcon.className =
        category.icon;


    /* ==========================================
       MASCARAR TELEFONE
       
       Exemplo:
       +258 859*****2
    ========================================== */

    function maskPhone(phone) {

        const clean =
            String(phone)
                .replace(/\D/g, '');


        if (
            clean.length < 12
        ) {

            return '+258 ********';

        }


        const localNumber =
            clean.substring(3);


        const firstThree =
            localNumber.substring(
                0,
                3
            );


        const lastDigit =
            localNumber.substring(
                localNumber.length - 1
            );


        return `+258 ${firstThree}*****${lastDigit}`;

    }


    /* ==========================================
       FILTRAR MOTORISTAS
    ========================================== */

    const availableDrivers =
        drivers.filter(
            driver =>
                driver.category ===
                selectedTransport &&
                driver.online === true
        );


    /* ==========================================
       MOTORISTA SELECIONADO
    ========================================== */

    let selectedDriver =
        null;


    /* ==========================================
       CRIAR CARD DO MOTORISTA
    ========================================== */

    function createDriverCard(driver) {

        const card =
            document.createElement(
                'article'
            );


        card.className =
            'driver-card';


        card.dataset.id =
            driver.id;


        card.innerHTML = `

            <img
                class="driver-avatar"
                src="${driver.avatar}"
                alt="${driver.name}"
                loading="lazy"
                onerror="this.src='https://i.pravatar.cc/150?u=${driver.id}'"
            >


            <div class="driver-info">

                <div class="driver-name-row">

                    <strong class="driver-name">
                        ${driver.name}
                    </strong>

                    <span class="driver-status"></span>

                </div>


                <div class="driver-phone">
                    ${maskPhone(driver.phone)}
                </div>


                <span class="driver-category">
                    ${category.name}
                </span>

            </div>


            <button
                class="choose-driver"
                type="button"
                data-driver-id="${driver.id}"
            >

                <i class="fi fi-rr-check"></i>

                Escolher

            </button>

        `;


        const chooseButton =
            card.querySelector(
                '.choose-driver'
            );


        chooseButton.addEventListener(
            'click',
            event => {

                event.stopPropagation();

                selectDriver(
                    driver,
                    card,
                    chooseButton
                );

            }
        );


        card.addEventListener(
            'click',
            () => {

                selectDriver(
                    driver,
                    card,
                    chooseButton
                );

            }
        );


        return card;

    }


    /* ==========================================
       SELECIONAR MOTORISTA
    ========================================== */

    function selectDriver(
        driver,
        card,
        button
    ) {

        document
            .querySelectorAll(
                '.driver-card'
            )
            .forEach(
                item => {

                    item.classList.remove(
                        'selected'
                    );

                    const itemButton =
                        item.querySelector(
                            '.choose-driver'
                        );


                    if (itemButton) {

                        itemButton.classList.remove(
                            'selected'
                        );

                        itemButton.innerHTML = `

                            <i class="fi fi-rr-check"></i>

                            Escolher

                        `;

                    }

                }
            );


        selectedDriver =
            driver;


        card.classList.add(
            'selected'
        );


        button.classList.add(
            'selected'
        );


        button.innerHTML = `

            <i class="fi fi-rr-check"></i>

            Selecionado

        `;


        continueButton.disabled =
            false;


        continueButton.querySelector(
            'span'
        ).textContent =
            `Continuar com ${driver.name.split(' ')[0]}`;

    }


    /* ==========================================
       MOSTRAR MOTORISTAS
    ========================================== */

    function renderDrivers() {

        driversList.innerHTML =
            '';


        if (
            availableDrivers.length === 0
        ) {

            driversList.innerHTML = `

                <div class="empty-state">

                    <strong>
                        Nenhum motorista disponível
                    </strong>

                    <p>
                        Não encontramos motoristas online
                        para esta categoria neste momento.
                    </p>

                </div>

            `;


            driverCount.textContent =
                'Nenhum motorista encontrado';

            return;

        }


        availableDrivers.forEach(
            driver => {

                driversList.appendChild(
                    createDriverCard(
                        driver
                    )
                );

            }
        );


        driverCount.textContent =
            `${availableDrivers.length} ${
                availableDrivers.length === 1
                    ? 'motorista'
                    : 'motoristas'
            } encontrados`;

    }


    /* ==========================================
       PROMOÇÕES
    ========================================== */

    function openPromotionModal() {

        promotionModal.classList.add(
            'show'
        );


        promotionModal.setAttribute(
            'aria-hidden',
            'false'
        );

    }


    function closePromotionModal() {

        promotionModal.classList.remove(
            'show'
        );


        promotionModal.setAttribute(
            'aria-hidden',
            'true'
        );

    }


    promotionButton.addEventListener(
        'click',
        openPromotionModal
    );


    closePromotion.addEventListener(
        'click',
        closePromotionModal
    );


    promotionOk.addEventListener(
        'click',
        closePromotionModal
    );


    promotionModal.addEventListener(
        'click',
        event => {

            if (
                event.target ===
                promotionModal
            ) {

                closePromotionModal();

            }

        }
    );


    /* ==========================================
       AJUDA
    ========================================== */

    function openHelpModal() {

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
        openHelpModal
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
       FECHAR AVISO IOS
    ========================================== */

    closeIosNotice.addEventListener(
        'click',
        () => {

            iosNotice.style.display =
                'none';

        }
    );


    /* ==========================================
       BOTÃO CONTINUAR
    ========================================== */

    continueButton.addEventListener(
        'click',
        () => {

            if (!selectedDriver) {

                return;

            }


            continueButton.disabled =
                true;


            continueButton.querySelector(
                'span'
            ).textContent =
                'A preparar pedido...';


            /*
             * Aqui futuramente entra a criação
             * do pedido no Firebase.
             */

            setTimeout(
                () => {

                    alert(
                        `Motorista selecionado: ${selectedDriver.name}\nTelefone: ${maskPhone(selectedDriver.phone)}`
                    );


                    continueButton.disabled =
                        false;


                    continueButton.querySelector(
                        'span'
                    ).textContent =
                        `Continuar com ${
                            selectedDriver.name.split(' ')[0]
                        }`;

                },
                600
            );

        }
    );


    /* ==========================================
       INICIAR
    ========================================== */

    renderDrivers();

});
