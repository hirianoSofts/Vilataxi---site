/* ==========================================
   BOTÃO HOME
========================================== */

const homeButton =
    document.getElementById(
        'homeButton'
    );


if (homeButton) {

    homeButton.addEventListener(
        'click',
        () => {

            /*
             * Evitar vários cliques
             */

            if (
                homeButton.classList.contains(
                    'loading'
                )
            ) {

                return;

            }


            homeButton.classList.add(
                'loading'
            );


            /*
             * Aguardar o progresso
             * visual terminar
             */

            setTimeout(
                () => {

                    window.location.href =
                        '../../index.html';

                },
                800
            );

        }
    );

}