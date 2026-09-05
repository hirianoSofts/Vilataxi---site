document.addEventListener(
    'DOMContentLoaded',
    () => {

        /* ==========================================
           CHAVES DO LOCALSTORAGE
        ========================================== */

        const TRIPS_KEY =
            'vilataxi_trips';

        const ACTIVE_TRIP_KEY =
            'vilataxi_active_trip';


        /* ==========================================
           ELEMENTOS
        ========================================== */

        const tripsBar =
            document.getElementById(
                'tripsBar'
            );


        const tripsTitle =
            document.getElementById(
                'tripsTitle'
            );


        const tripsSubtitle =
            document.getElementById(
                'tripsSubtitle'
            );


        const tripsCount =
            document.getElementById(
                'tripsCount'
            );


        const activeTripBadge =
            document.getElementById(
                'activeTripBadge'
            );


        /* ==========================================
           LER VIAGENS
        ========================================== */

        function getTrips() {

            try {

                const saved =
                    localStorage.getItem(
                        TRIPS_KEY
                    );


                if (!saved) {

                    return [];

                }


                const trips =
                    JSON.parse(saved);


                return Array.isArray(trips)
                    ? trips
                    : [];

            } catch (error) {

                console.error(
                    'Erro ao ler viagens:',
                    error
                );

                return [];

            }

        }


        /* ==========================================
           VIAGEM ACTIVA
        ========================================== */

        function getActiveTrip() {

            try {

                const saved =
                    localStorage.getItem(
                        ACTIVE_TRIP_KEY
                    );


                if (!saved) {

                    return null;

                }


                return JSON.parse(
                    saved
                );

            } catch (error) {

                console.error(
                    'Erro ao ler viagem activa:',
                    error
                );

                return null;

            }

        }


        /* ==========================================
           ACTUALIZAR BARRA
        ========================================== */

        function updateTripsBar() {

            const trips =
                getTrips();


            const activeTrip =
                getActiveTrip();


            /* --------------------------------------
               QUANTIDADE
            -------------------------------------- */

            tripsCount.textContent =
                trips.length;


            /* --------------------------------------
               SEM VIAGENS
            -------------------------------------- */

            if (
                trips.length === 0
            ) {

                tripsTitle.textContent =
                    'Viagens';


                tripsSubtitle.textContent =
                    'Nenhuma viagem';


                activeTripBadge.hidden =
                    true;


                return;

            }


            /* --------------------------------------
               UMA VIAGEM
            -------------------------------------- */

            if (
                trips.length === 1
            ) {

                tripsTitle.textContent =
                    'Viagem';


            } else {

                tripsTitle.textContent =
                    'Viagens';

            }


            /* --------------------------------------
               VIAGEM ACTIVA
            -------------------------------------- */

            if (
                activeTrip
            ) {

                const driverName =
                    activeTrip.driver &&
                    activeTrip.driver.name
                        ? activeTrip.driver.name
                        : 'Motorista';


                tripsSubtitle.textContent =
                    `${driverName} está a caminho`;


                activeTripBadge.hidden =
                    false;


                return;

            }


            /* --------------------------------------
               SEM VIAGEM ACTIVA
            -------------------------------------- */

            tripsSubtitle.textContent =
                trips.length === 1
                    ? '1 viagem guardada'
                    : `${trips.length} viagens guardadas`;


            activeTripBadge.hidden =
                true;

        }


        /* ==========================================
           ABRIR VIAGEM ACTIVA
        ========================================== */

        function openActiveTrip() {

            const activeTrip =
                getActiveTrip();


            if (!activeTrip) {

                /*
                 * Se não existe viagem activa,
                 * abrimos a página normal de viagens.
                 */

                window.location.href =
                    '/viagem/';

                return;

            }


            /*
             * A página do pedido está em:
             *
             * viagem/pedido/pedido.html
             */

            window.location.href =
                'viagem/pedido/';

        }


        /* ==========================================
           CLIQUE NA BARRA
        ========================================== */

        if (tripsBar) {

            tripsBar.addEventListener(
                'click',
                openActiveTrip
            );


            tripsBar.addEventListener(
                'keydown',
                event => {

                    if (
                        event.key ===
                        'Enter' ||
                        event.key ===
                        ' '
                    ) {

                        event.preventDefault();

                        openActiveTrip();

                    }

                }
            );

        }


        /* ==========================================
           ACTUALIZAÇÃO INICIAL
        ========================================== */

        updateTripsBar();


        /* ==========================================
           ACTUALIZAR QUANDO VOLTA À PÁGINA
        ========================================== */

        window.addEventListener(
            'pageshow',
            updateTripsBar
        );


        window.addEventListener(
            'storage',
            updateTripsBar
        );

    }
);