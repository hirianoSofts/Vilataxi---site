import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    setPersistence,
    browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    set
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


// ======================================================
// FIREBASE
// ======================================================

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


// ======================================================
// PERSISTÊNCIA
// ======================================================

await setPersistence(
    auth,
    browserLocalPersistence
).catch(error => {
    console.error("Erro na persistência:", error);
});


// ======================================================
// ELEMENTOS
// ======================================================

const loginForm =
    document.getElementById("loginForm");

const cadastroForm =
    document.getElementById("cadastroForm");


// ======================================================
// LOADING DOS BOTÕES
// ======================================================

function iniciarCarregamento(botao, texto) {

    if (!botao) return;

    botao.disabled = true;

    botao.classList.add("loading");

    botao.setAttribute(
        "aria-busy",
        "true"
    );

    botao.dataset.textoOriginal =
        botao.innerHTML;

    botao.innerHTML = `
        <span class="auth-spinner"></span>
        <span>${texto}</span>
    `;
}


function pararCarregamento(botao) {

    if (!botao) return;

    botao.disabled = false;

    botao.classList.remove("loading");

    botao.removeAttribute("aria-busy");

    if (botao.dataset.textoOriginal) {

        botao.innerHTML =
            botao.dataset.textoOriginal;

        delete botao.dataset.textoOriginal;
    }
}


// ======================================================
// FUNÇÃO DE ERRO
// ======================================================

function mensagemErro(error) {

    console.error(
        "Firebase:",
        error.code,
        error.message
    );

    switch (error.code) {

        case "auth/invalid-credential":
            return "E-mail ou palavra-passe incorretos.";

        case "auth/user-not-found":
            return "Esta conta não existe.";

        case "auth/wrong-password":
            return "Palavra-passe incorreta.";

        case "auth/invalid-email":
            return "O e-mail informado é inválido.";

        case "auth/email-already-in-use":
            return "Este e-mail já está registado.";

        case "auth/weak-password":
            return "A palavra-passe deve ter pelo menos 6 caracteres.";

        case "auth/network-request-failed":
            return "Sem conexão com a Internet.";

        case "auth/too-many-requests":
            return "Muitas tentativas. Aguarde alguns minutos.";

        case "auth/operation-not-allowed":
            return "O login por e-mail ainda não está ativado no Firebase.";

        case "auth/user-disabled":
            return "Esta conta foi desativada.";

        case "PERMISSION_DENIED":
            return "O Firebase Database recusou a gravação.";

        default:
            return "Ocorreu um erro. Verifique o console do navegador.";
    }
}


// ======================================================
// LOGIN
// ======================================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const botao =
                loginForm.querySelector(
                    ".btn-auth-primary"
                );

            const formData =
                new FormData(loginForm);

            const email =
                String(
                    formData.get("loginContact") || ""
                )
                .trim()
                .toLowerCase();

            const password =
                String(
                    formData.get("loginPassword") || ""
                );


            // ------------------------------
            // VALIDAÇÃO
            // ------------------------------

            if (!email || !password) {

                alert(
                    "Preencha o e-mail e a palavra-passe."
                );

                return;
            }


            // ------------------------------
            // INICIAR LOADING
            // ------------------------------

            iniciarCarregamento(
                botao,
                "Entrando..."
            );


            try {

                console.log(
                    "Tentando entrar:",
                    email
                );


                const credential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                console.log(
                    "LOGIN OK:",
                    credential.user.uid
                );


                // A sessão já está criada.
                // Agora pode entrar na página principal.

                window.location.replace(
                    "../index.html"
                );


            } catch (error) {

                console.error(
                    "ERRO LOGIN:",
                    error
                );


                pararCarregamento(botao);


                alert(
                    mensagemErro(error)
                );
            }

        }
    );
}


// ======================================================
// CADASTRO
// ======================================================

if (cadastroForm) {

    cadastroForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const botao =
                cadastroForm.querySelector(
                    ".btn-auth-primary"
                );


            const formData =
                new FormData(cadastroForm);


            const nome =
                String(
                    formData.get("fullName") || ""
                ).trim();


            const telefone =
                String(
                    formData.get("phone") || ""
                ).trim();


            const email =
                String(
                    formData.get("email") || ""
                )
                .trim()
                .toLowerCase();


            const password =
                String(
                    formData.get("signupPassword") || ""
                );


            const confirmPassword =
                String(
                    formData.get("confirmPassword") || ""
                );


            // ==================================================
            // VALIDAÇÕES
            // ==================================================

            if (!nome || !telefone || !email) {

                alert(
                    "Preencha todos os campos."
                );

                return;
            }


            if (password.length < 6) {

                alert(
                    "A palavra-passe deve ter pelo menos 6 caracteres."
                );

                return;
            }


            if (password !== confirmPassword) {

                alert(
                    "As palavras-passe não coincidem."
                );

                return;
            }


            // ==================================================
            // INICIAR LOADING
            // ==================================================

            iniciarCarregamento(
                botao,
                "Criando conta..."
            );


            try {

                console.log(
                    "Criando conta:",
                    email
                );


                // ==================================================
                // 1. CRIAR CONTA NO FIREBASE AUTH
                // ==================================================

                const credential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    credential.user;


                console.log(
                    "CONTA CRIADA NO AUTH:",
                    user.uid
                );


                // ==================================================
                // 2. GUARDAR NOME
                // ==================================================

                await updateProfile(
                    user,
                    {
                        displayName: nome
                    }
                );


                console.log(
                    "Nome salvo no Authentication."
                );


                // ==================================================
                // 3. GUARDAR PERFIL NO DATABASE
                // ==================================================

                try {

                    await set(
                        ref(
                            database,
                            "usuarios/" + user.uid
                        ),
                        {
                            uid: user.uid,
                            nome: nome,
                            telefone: telefone,
                            email: email,
                            tipo: "passageiro",
                            criadoEm: Date.now()
                        }
                    );


                    console.log(
                        "PERFIL SALVO NO DATABASE."
                    );

                } catch (databaseError) {

                    console.error(
                        "ERRO AO SALVAR PERFIL:",
                        databaseError
                    );

                    alert(
                        "A conta foi criada, mas não foi possível guardar alguns dados do perfil."
                    );
                }


                // ==================================================
                // 4. IR PARA O INDEX
                // ==================================================

                window.location.replace(
                    "../index.html"
                );

            } catch (error) {

                console.error(
                    "ERRO AO CRIAR CONTA:",
                    error
                );


                pararCarregamento(botao);


                alert(
                    mensagemErro(error)
                );
            }

        }
    );
    }
