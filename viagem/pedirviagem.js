document.addEventListener('DOMContentLoaded', () => {

/* ==========================================  
   DADOS DOS TRANSPORTES  
========================================== */  

const transportData = {  

    txopela: {  

        name: 'TXOPELA',  

        image: '../images/txopela.png',  

        description:  
            'O clássico de três rodas, ideal para fugir do trânsito.',  

        price: 107  

    },  


    eco: {  

        name: 'CARRO ECO',  

        image: '../images/carro.png',  

        description:  
            'Viagem confortável e climatizada para um trajeto tranquilo.',  

        price: 175  

    },  


    moto: {  

        name: 'MOTOTAXI',  

        image: '../images/mota.png',  

        description:  
            'Uma opção rápida e prática para chegar ao seu destino.',  

        price: 50  

    }  

};  


/* ==========================================  
   TRANSPORTE SELECIONADO  
========================================== */  

const params =  
    new URLSearchParams(  
        window.location.search  
    );  


const vehicle =  
    params.get('transporte') ||  
    'txopela';  


const data =  
    transportData[vehicle] ||  
    transportData.txopela;  


document.getElementById(  
    'vehicleImage'  
).src = data.image;  


document.getElementById(  
    'vehicleImage'  
).alt = data.name;  


document.getElementById(  
    'vehicleName'  
).textContent = data.name;  


document.getElementById(  
    'vehicleDescription'  
).textContent = data.description;  


document.getElementById(  
    'vehiclePrice'  
).textContent = data.price;  



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

CATEGORIA SELECIONADA
========================================== */

const selectedTransport = vehicle;

const category =
transportData[selectedTransport] ||
transportData.txopela;

/* ==========================================  
   ELEMENTOS  
========================================== */  

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


        /* ======================================
           ESTADO DE CARREGAMENTO
        ====================================== */

        continueButton.disabled = true;

        continueButton.classList.add(
            'loading'
        );


        const buttonText =
            continueButton.querySelector(
                'span'
            );


        buttonText.textContent =
            'A preparar pedido...';



        /* ======================================
           CRIAR ID DO PEDIDO
        ====================================== */

        const now =
            new Date();


        const date =
            now.getFullYear().toString() +
            String(
                now.getMonth() + 1
            ).padStart(2, '0') +
            String(
                now.getDate()
            ).padStart(2, '0');


        const random =
            Math.floor(
                1000 +
                Math.random() * 9000
            );


        const orderId =
            `VT-${date}-${random}`;



        /* ======================================
           GUARDAR PEDIDO
        ====================================== */

        const orderData = {

            id:
                orderId,

            status:
                'A preparar',

            createdAt:
                new Date().toISOString(),

            driver: {

                id:
                    selectedDriver.id,

                name:
                    selectedDriver.name,

                phone:
                    selectedDriver.phone,

                avatar:
                    selectedDriver.avatar,

                category:
                    selectedDriver.category

            },

            transport: {

                type:
                    selectedTransport,

                name:
                    category.name,

                image:
                    category.image,

                price:
                    category.price

            }

        };


        /* ======================================
   GUARDAR PEDIDO NA SESSÃO
====================================== */

sessionStorage.setItem(
    'vilataxi_current_order',
    JSON.stringify(orderData)
);


/* ======================================
   GUARDAR VIAGEM NO LOCALSTORAGE
====================================== */

const TRIPS_KEY =
    'vilataxi_trips';

const ACTIVE_TRIP_KEY =
    'vilataxi_active_trip';


let trips = [];


try {

    const savedTrips =
        localStorage.getItem(
            TRIPS_KEY
        );


    if (savedTrips) {

        const parsedTrips =
            JSON.parse(savedTrips);


        if (
            Array.isArray(parsedTrips)
        ) {

            trips =
                parsedTrips;

        }

    }

} catch (error) {

    console.error(
        'Erro ao recuperar viagens:',
        error
    );

}


/* ======================================
   EVITAR DUPLICAÇÃO
====================================== */

const alreadyExists =
    trips.some(
        trip =>
            trip.id ===
            orderData.id
    );


if (!alreadyExists) {

    trips.push(
        orderData
    );

}


/* ======================================
   GUARDAR TODAS AS VIAGENS
====================================== */

localStorage.setItem(
    TRIPS_KEY,
    JSON.stringify(trips)
);


/* ======================================
   MARCAR COMO VIAGEM ACTIVA
====================================== */

localStorage.setItem(
    ACTIVE_TRIP_KEY,
    JSON.stringify(orderData)
);



        /* ======================================
           PROGRESSO
        ====================================== */

        let progress =
            0;


        const progressInterval =
            setInterval(
                () => {

                    progress += 20;


                    if (
                        progress >= 100
                    ) {

                        clearInterval(
                            progressInterval
                        );


                        /*
                         * IMPORTANTE:
                         *
                         * pedirviagem.html está em:
                         *
                         * viagem/pedirviagem.html
                         *
                         * e a página do pedido está em:
                         *
                         * viagem/pedido/index.html
                         */

                        window.location.href =
                            'pedido/';

                    }

                },
                120
            );

    }
);


/* ==========================================  
   INICIAR  
========================================== */  

renderDrivers();

});
