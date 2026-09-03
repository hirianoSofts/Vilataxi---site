/* ==========================================
   SISTEMA DE COOKIES — VILATÁXI
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const cookieBanner = document.getElementById("cookieBanner");
    const cookieOverlay = document.getElementById("cookieOverlay");
    const cookieModal = document.getElementById("cookieModal");

    const acceptCookies = document.getElementById("acceptCookies");
    const rejectCookies = document.getElementById("rejectCookies");

    const openCookieSettings = document.getElementById("openCookieSettings");
    const closeCookieSettings = document.getElementById("closeCookieSettings");

    const saveCookiePreferences =
        document.getElementById("saveCookiePreferences");

    const preferencesCookies =
        document.getElementById("preferencesCookies");

    const analyticsCookies =
        document.getElementById("analyticsCookies");


    const COOKIE_KEY = "vilataxi_cookie_preferences";


    /* ================================
       VERIFICAR CONSENTIMENTO
    ================================= */

    function getCookiePreferences() {

        try {

            const saved = localStorage.getItem(COOKIE_KEY);

            return saved ? JSON.parse(saved) : null;

        } catch (error) {

            console.warn(
                "Não foi possível ler as preferências de cookies.",
                error
            );

            return null;
        }
    }


    /* ================================
       GUARDAR CONSENTIMENTO
    ================================= */

    function savePreferences(preferences) {

        try {

            localStorage.setItem(
                COOKIE_KEY,
                JSON.stringify({
                    ...preferences,
                    savedAt: new Date().toISOString()
                })
            );

        } catch (error) {

            console.warn(
                "Não foi possível guardar as preferências de cookies.",
                error
            );
        }
    }


    /* ================================
       MOSTRAR BANNER
    ================================= */

    function showBanner() {

        if (!cookieBanner) return;

        cookieBanner.classList.add("show");
        cookieBanner.setAttribute("aria-hidden", "false");
    }


    /* ================================
       ESCONDER BANNER
    ================================= */

    function hideBanner() {

        if (!cookieBanner) return;

        cookieBanner.classList.remove("show");
        cookieBanner.setAttribute("aria-hidden", "true");
    }


    /* ================================
       ABRIR MODAL
    ================================= */

    function openModal() {

        if (!cookieModal || !cookieOverlay) return;

        const preferences = getCookiePreferences();

        if (preferences) {

            preferencesCookies.checked =
                preferences.preferences === true;

            analyticsCookies.checked =
                preferences.analytics === true;

        }

        hideBanner();

        cookieOverlay.classList.add("show");
        cookieModal.classList.add("show");

        cookieOverlay.setAttribute("aria-hidden", "false");
        cookieModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }


    /* ================================
       FECHAR MODAL
    ================================= */

    function closeModal() {

        cookieOverlay.classList.remove("show");
        cookieModal.classList.remove("show");

        cookieOverlay.setAttribute("aria-hidden", "true");
        cookieModal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (!getCookiePreferences()) {
            showBanner();
        }
    }


    /* ================================
       ACEITAR TODOS
    ================================= */

    function acceptAll() {

        savePreferences({
            essential: true,
            preferences: true,
            analytics: true
        });

        hideBanner();
    }


    /* ================================
       RECUSAR OPCIONAIS
    ================================= */

    function rejectOptional() {

        savePreferences({
            essential: true,
            preferences: false,
            analytics: false
        });

        hideBanner();
    }


    /* ================================
       GUARDAR PERSONALIZAÇÃO
    ================================= */

    function saveCustomPreferences() {

        savePreferences({
            essential: true,
            preferences: preferencesCookies.checked,
            analytics: analyticsCookies.checked
        });

        closeModal();
    }


    /* ================================
       EVENTOS
    ================================= */

    acceptCookies?.addEventListener(
        "click",
        acceptAll
    );

    rejectCookies?.addEventListener(
        "click",
        rejectOptional
    );

    openCookieSettings?.addEventListener(
        "click",
        openModal
    );

    closeCookieSettings?.addEventListener(
        "click",
        closeModal
    );

    cookieOverlay?.addEventListener(
        "click",
        closeModal
    );

    saveCookiePreferences?.addEventListener(
        "click",
        saveCustomPreferences
    );


    /* ESC fecha o modal */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeModal();
        }

    });


    /* ================================
       INICIALIZAÇÃO
    ================================= */

    const savedPreferences = getCookiePreferences();

    if (!savedPreferences) {

        setTimeout(() => {
            showBanner();
        }, 800);

    }

});
