import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    get
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyDa4I6LcvHl1iuGJtkepRxVdR-CqNLeqjY",
    authDomain: "vilataxi-87f20.firebaseapp.com",
    databaseURL: "https://vilataxi-87f20-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vilataxi-87f20",
    storageBucket: "vilataxi-87f20.firebasestorage.app",
    messagingSenderId: "926644637193",
    appId: "1:926644637193:web:75638d86c3f7430fc9b2d8"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const database = getDatabase(app);


const loader =
    document.getElementById("auth-loader");

const accountName =
    document.querySelector(".account-name");

const accountEmail =
    document.querySelector(".account-email");

const accountAvatar =
    document.querySelector(".account-avatar-lg img");

const headerAvatar =
    document.querySelector(".avatar-circle img");


// IMPORTANTE:
// O HTML usa "logoutbtn", não "logoutBtn".
const logoutBtn =
    document.getElementById("logoutbtn");


// ==========================================
// AUTENTICAÇÃO
// ==========================================

onAuthStateChanged(auth, async (user) => {

    console.log(
        "Estado da autenticação:",
        user ? user.uid : "não autenticado"
    );


    // ======================================
    // NÃO AUTENTICADO
    // ======================================

    if (!user) {

        window.location.replace(
            "login/login.html"
        );

        return;
    }


    // ======================================
    // DADOS DO FIREBASE AUTH
    // ======================================

    if (accountName) {

        accountName.textContent =
            user.displayName || "Passageiro";
    }


    if (accountEmail) {

        accountEmail.textContent =
            user.email || "";
    }


    // Foto do Google
    if (user.photoURL) {

        if (accountAvatar) {
            accountAvatar.src = user.photoURL;
        }

        if (headerAvatar) {
            headerAvatar.src = user.photoURL;
        }
    }


    // ======================================
    // DADOS DO REALTIME DATABASE
    // ======================================

    try {

        const snapshot =
            await get(
                ref(
                    database,
                    "usuarios/" + user.uid
                )
            );


        if (snapshot.exists()) {

            const dados =
                snapshot.val();


            if (accountName && dados.nome) {

                accountName.textContent =
                    dados.nome;
            }


            if (accountEmail && dados.email) {

                accountEmail.textContent =
                    dados.email;
            }


            if (dados.foto) {

                if (accountAvatar) {
                    accountAvatar.src = dados.foto;
                }

                if (headerAvatar) {
                    headerAvatar.src = dados.foto;
                }
            }

        }

    } catch (error) {

        console.error(
            "Erro ao carregar perfil:",
            error
        );
    }


    // ======================================
    // ESCONDER LOADER
    // ======================================

    if (loader) {

        loader.classList.add("hidden");

        setTimeout(() => {

            loader.remove();

        }, 300);
    }

});


// ==========================================
// LOGOUT
// ==========================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async () => {

            try {

                await signOut(auth);

                window.location.replace(
                    "login/login.html"
                );

            } catch (error) {

                console.error(
                    "Erro ao sair:",
                    error
                );

                alert(
                    "Não foi possível terminar a sessão."
                );
            }

        }
    );

}
