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
       ELEMENTOS
    ========================================== */

    const rideSheet =
        document.getElementById(
            'rideSheet'
        );


    const expandTrip =
        document.getElementById(
            'expandTrip'
        );


    const originSelector =
        document.getElementById(
            'originSelector'
        );


    const destinationSelector =
        document.getElementById(
            'destinationSelector'
        );


    const pickupLocation =
        document.getElementById(
            'pickupLocation'
        );


    const destinationLocation =
        document.getElementById(
            'destinationLocation'
        );


    const tripDistance =
        document.getElementById(
            'tripDistance'
        );


    const tripTime =
        document.getElementById(
            'tripTime'
        );


    const tripPrice =
        document.getElementById(
            'tripPrice'
        );


    const requestButton =
        document.getElementById(
            'requestRide'
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
       ABRIR / FECHAR DETALHES
    ========================================== */

    expandTrip.addEventListener(
        'click',
        () => {

            rideSheet.classList.toggle(
                'expanded'
            );

        }
    );


    /* ==========================================
       MODO DE SELEÇÃO
       
       origin = origem
       destination = destino
    ========================================== */

    let selectionMode =
        'origin';


    function setSelectionMode(mode) {

        selectionMode = mode;


        originSelector.classList.toggle(
            'active',
            mode === 'origin'
        );


        destinationSelector.classList.toggle(
            'active',
            mode === 'destination'
        );


        if (mode === 'origin') {

            pickupLocation.textContent =
                'Toque no mapa para definir a origem';

        } else {

            destinationLocation.textContent =
                'Toque no mapa para definir o destino';

        }

    }


    originSelector.addEventListener(
        'click',
        () => {

            setSelectionMode(
                'origin'
            );

        }
    );


    destinationSelector.addEventListener(
        'click',
        () => {

            setSelectionMode(
                'destination'
            );

        }
    );


    /* ==========================================
       MAPBOX
    ========================================== */

    mapboxgl.accessToken =
        'pk.eyJ1IjoiaXJpYW5vIiwiYSI6ImNtc2Q5enM2dzA0N2cyenNma2V1dHY2amIifQ.vEHa9WySSOYAIrOEwz-hwQ';


    const map =
        new mapboxgl.Map({

            container: 'map',

            style:
                'mapbox://styles/mapbox/streets-v12',

            center: [
                35.3069,
                -22.0131
            ],

            zoom: 13,

            attributionControl: true

        });


    map.addControl(

        new mapboxgl.NavigationControl({
            showCompass: false
        }),

        'top-right'

    );


    /* ==========================================
       VARIÁVEIS DA VIAGEM
    ========================================== */

    let originCoordinates =
        null;


    let destinationCoordinates =
        null;


    let originMarker =
        null;


    let destinationMarker =
        null;


    let routeLoaded =
        false;


    /* ==========================================
       CRIAR MARCADOR PERSONALIZADO
    ========================================== */

    function createMarkerElement(type) {

        const element =
            document.createElement(
                'div'
            );


        element.className =
            `map-marker ${type}`;


        return element;

    }


    /* ==========================================
       MARCADOR DE ORIGEM
    ========================================== */

    function updateOrigin(lng, lat) {

        originCoordinates = [
            lng,
            lat
        ];


        if (originMarker) {

            originMarker.remove();

        }


        originMarker =
            new mapboxgl.Marker({

                element:
                    createMarkerElement(
                        'origin'
                    ),

                anchor:
                    'center'

            })

            .setLngLat([
                lng,
                lat
            ])

            .addTo(map);


        pickupLocation.textContent =
            `${lat.toFixed(5)}, ${lng.toFixed(5)}`;


        checkRoute();

    }


    /* ==========================================
       MARCADOR DE DESTINO
    ========================================== */

    function updateDestination(lng, lat) {

        destinationCoordinates = [
            lng,
            lat
        ];


        if (destinationMarker) {

            destinationMarker.remove();

        }


        destinationMarker =
            new mapboxgl.Marker({

                element:
                    createMarkerElement(
                        'destination'
                    ),

                anchor:
                    'center'

            })

            .setLngLat([
                lng,
                lat
            ])

            .addTo(map);


        destinationLocation.textContent =
            `${lat.toFixed(5)}, ${lng.toFixed(5)}`;


        checkRoute();

    }


    /* ==========================================
       CLIQUE NO MAPA
    ========================================== */

    map.on(
        'click',
        event => {

            const lng =
                event.lngLat.lng;


            const lat =
                event.lngLat.lat;


            if (
                selectionMode ===
                'origin'
            ) {

                updateOrigin(
                    lng,
                    lat
                );

            } else {

                updateDestination(
                    lng,
                    lat
                );

            }

        }
    );


    /* ==========================================
       VERIFICAR SE PODE DESENHAR ROTA
    ========================================== */

    function checkRoute() {

        if (
            !originCoordinates ||
            !destinationCoordinates
        ) {

            requestButton.disabled =
                true;

            return;

        }


        requestButton.disabled =
            false;


        requestButton.querySelector(
            'span'
        ).textContent =
            'Confirmar viagem';


        getRoute();

    }


    /* ==========================================
       MAPBOX DIRECTIONS API
    ========================================== */

    async function getRoute() {

        if (
            !originCoordinates ||
            !destinationCoordinates
        ) {

            return;

        }


        const origin =
            originCoordinates.join(',');


        const destination =
            destinationCoordinates.join(',');


        const url =
            `https://api.mapbox.com/directions/v5/mapbox/driving/` +
            `${origin};${destination}` +
            `?alternatives=false` +
            `&geometries=geojson` +
            `&overview=full` +
            `&steps=false` +
            `&access_token=${mapboxgl.accessToken}`;


        try {

            const response =
                await fetch(url);


            if (!response.ok) {

                throw new Error(
                    'Erro ao consultar rota'
                );

            }


            const result =
                await response.json();


            if (
                !result.routes ||
                !result.routes.length
            ) {

                return;

            }


            const route =
                result.routes[0];


            drawRoute(
                route.geometry
            );


            updateTripInformation(
                route.distance,
                route.duration
            );


        } catch (error) {

            console.error(
                'Erro da rota:',
                error
            );

        }

    }


    /* ==========================================
       DESENHAR ROTA
    ========================================== */

    function drawRoute(
        geometry
    ) {

        const sourceId =
            'vilataxi-route';


        const layerId =
            'vilataxi-route-line';


        if (
            map.getLayer(layerId)
        ) {

            map.removeLayer(
                layerId
            );

        }


        if (
            map.getSource(sourceId)
        ) {

            map.removeSource(
                sourceId
            );

        }


        map.addSource(
            sourceId,
            {

                type: 'geojson',

                data: {

                    type: 'Feature',

                    properties: {},

                    geometry:
                        geometry

                }

            }
        );


        map.addLayer({

            id: layerId,

            type: 'line',

            source: sourceId,

            layout: {

                'line-cap':
                    'round',

                'line-join':
                    'round'

            },

            paint: {

                'line-color':
                    '#0C2D24',

                'line-width':
                    5,

                'line-opacity':
                    0.85

            }

        });


        routeLoaded =
            true;


        /* Ajustar mapa aos dois pontos */

        const bounds =
            new mapboxgl.LngLatBounds();


        bounds.extend(
            originCoordinates
        );


        bounds.extend(
            destinationCoordinates
        );


        map.fitBounds(
            bounds,
            {

                padding: {

                    top: 120,

                    bottom: 390,

                    left: 35,

                    right: 35

                },

                duration: 900,

                maxZoom: 16

            }
        );

    }


    /* ==========================================
       DISTÂNCIA / TEMPO / PREÇO
    ========================================== */

    function updateTripInformation(
        distanceMeters,
        durationSeconds
    ) {

        const distanceKm =
            distanceMeters / 1000;


        const minutes =
            Math.max(
                1,
                Math.round(
                    durationSeconds / 60
                )
            );


        /*
         * O valor armazenado no transporte
         * é usado como preço estimado.
         *
         * Pode ser substituído depois
         * pelo sistema real de preço/km.
         */

        const estimatedPrice =
            calculatePrice(
                distanceKm,
                data.price
            );


        tripDistance.textContent =
            `${distanceKm.toFixed(1)} km`;


        tripTime.textContent =
            `${minutes} min`;


        tripPrice.textContent =
            `${estimatedPrice} MZN`;

    }


    /* ==========================================
       CÁLCULO DE PREÇO
    ========================================== */

    function calculatePrice(
        distanceKm,
        basePrice
    ) {

        /*
         * Preço mínimo = preço do transporte.
         *
         * Cada km adicional acrescenta
         * 10 MZN nesta versão.
         *
         * Este valor pode ser alterado
         * posteriormente para o preço real
         * da VilaTáxi.
         */

        const extraKm =
            Math.max(
                0,
                distanceKm - 1
            );


        const price =
            basePrice +
            (extraKm * 10);


        return Math.round(
            price
        );

    }


    /* ==========================================
       LOCALIZAÇÃO DO UTILIZADOR
    ========================================== */

    function getUserLocation() {

        if (
            !navigator.geolocation
        ) {

            pickupLocation.textContent =
                'Geolocalização não suportada';

            return;

        }


        pickupLocation.textContent =
            'A obter localização...';


        navigator.geolocation.getCurrentPosition(

            position => {

                const lat =
                    position.coords.latitude;


                const lng =
                    position.coords.longitude;


                updateOrigin(
                    lng,
                    lat
                );


                map.flyTo({

                    center: [
                        lng,
                        lat
                    ],

                    zoom: 16,

                    speed: 1.2,

                    essential: true

                });


                /*
                 * Depois de obter a origem,
                 * muda automaticamente para
                 * seleção do destino.
                 */

                setSelectionMode(
                    'destination'
                );

            },


            error => {

                console.error(
                    'Erro de localização:',
                    error
                );


                pickupLocation.textContent =
                    'Toque no mapa para definir a origem';

            },

            {

                enableHighAccuracy:
                    true,

                timeout:
                    10000,

                maximumAge:
                    30000

            }

        );

    }


    /* ==========================================
       BOTÃO MINHA LOCALIZAÇÃO
    ========================================== */

    document
        .getElementById(
            'locationButton'
        )
        .addEventListener(
            'click',
            getUserLocation
        );


    /* ==========================================
       BOTÃO PRINCIPAL
    ========================================== */

    requestButton.addEventListener(
        'click',
        () => {

            if (
                !originCoordinates ||
                !destinationCoordinates
            ) {

                return;

            }


            requestButton.disabled =
                true;


            requestButton.querySelector(
                'span'
            ).textContent =
                'A preparar viagem...';


            setTimeout(
                () => {

                    alert(
                        'Origem e destino selecionados. Próximo passo: confirmar a solicitação.'
                    );


                    requestButton.disabled =
                        false;


                    requestButton.querySelector(
                        'span'
                    ).textContent =
                        'Confirmar viagem';


                },
                700
            );

        }
    );


    /* ==========================================
       INICIALIZAÇÃO
    ========================================== */

    map.on(
        'load',
        () => {

            getUserLocation();

        }
    );

});