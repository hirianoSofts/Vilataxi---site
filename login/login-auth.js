import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    set,
    get
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";


// ==========================================
// FIREBASE
// ==========================================

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

const googleProvider = new GoogleAuthProvider();

auth.languageCode = "pt";


// ==========================================
// ELEMENTOS
// ==========================================

const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");

const googleLoginBtn = document.getElementById("googleLoginBtn");

const passwordError = document.getElementById("passwordError");


// ==========================================
// FUNÇÃO PARA MOSTRAR ERROS
// ==========================================

function mostrarErro(error) {

    console.error("Firebase:", error);

    let mensagem = "Não foi possível concluir a operação.";

    switch (error.code) {

        case "auth/invalid-email":
            mensagem = "O e-mail não é válido.";
            break;

        case "auth/user-not-found":
            mensagem = "Não existe uma conta com este e-mail.";
            break;

        case "auth/wrong-password":
        case "auth/invalid-credential":
            mensagem = "E-mail ou palavra-passe incorretos.";
            break;

        case "auth/email-already-in-use":
            mensagem = "Este e-mail já está registado.";
            break;

        case "auth/weak-password":
            mensagem = "A palavra-passe deve ter pelo menos 6 caracteres.";
            break;

        case "auth/network-request-failed":
            mensagem = "Erro de ligação. Verifique a sua internet e tente novamente.";
            break;

        case "auth/popup-closed-by-user":
            mensagem = "O login Google foi cancelado.";
            break;

        case "auth/unauthorized-domain":
            mensagem = "Este domínio não está autorizado no Firebase.";
            break;

        case "auth/operation-not-allowed":
            mensagem = "Este método de login ainda não está ativado no Firebase.";
            break;

        case "auth/account-exists-with-different-credential":
            mensagem = "Este e-mail já existe usando outro método de login.";
            break;

        case "auth/too-many-requests":
            mensagem = "Muitas tentativas. Aguarde alguns minutos e tente novamente.";
            break;

        default:
            if (error.message) {
                console.error(error.message);
            }
    }

    alert(mensagem);
}


// ==========================================
// LOGIN COM E-MAIL
// ==========================================

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = loginForm
            .querySelector('[name="loginContact"]')
            .value
            .trim();

        const password = loginForm
            .querySelector('[name="loginPassword"]')
            .value;

        if (!email || !password) {
            alert("Preencha o e-mail e a palavra-passe.");
            return;
        }

        const button = loginForm.querySelector(".btn-auth-primary");

        if (button) {
            button.disabled = true;
            button.textContent = "A entrar...";
        }

        try {

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            window.location.replace("../");

        } catch (error) {

            mostrarErro(error);

            if (button) {
                button.disabled = false;
                button.innerHTML = `
                    Entrar
                    <i class="fi fi-rr-arrow-right"></i>
                `;
            }
        }

    });

}


// ==========================================
// CRIAR CONTA
// ==========================================

if (cadastroForm) {

    cadastroForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const fullName = cadastroForm
            .querySelector('[name="fullName"]')
            .value
            .trim();

        const phone = cadastroForm
            .querySelector('[name="phone"]')
            .value
            .trim();

        const email = cadastroForm
            .querySelector('[name="email"]')
            .value
            .trim();

        const password = cadastroForm
            .querySelector('[name="signupPassword"]')
            .value;

        const confirmPassword = cadastroForm
            .querySelector('[name="confirmPassword"]')
            .value;

        const terms = cadastroForm
            .querySelector('[name="terms"]')
            .checked;


        // ------------------------------
        // VALIDAÇÕES
        // ------------------------------

        if (!fullName || !phone || !email || !password || !confirmPassword) {
            alert("Preencha todos os campos.");
            return;
        }

        if (password !== confirmPassword) {

            if (passwordError) {
                passwordError.style.display = "block";
            }

            return;
        }

        if (passwordError) {
            passwordError.style.display = "none";
        }

        if (!terms) {
            alert("Aceite os Termos de Uso e a Política de Privacidade.");
            return;
        }


        const button = cadastroForm.querySelector(".btn-auth-primary");

        if (button) {
            button.disabled = true;
            button.textContent = "A criar conta...";
        }


        try {

            // Criar utilizador no Firebase Authentication
            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;


            // Guardar nome no Authentication
            await updateProfile(user, {
                displayName: fullName
            });


            // Guardar dados no Realtime Database
            await set(
                ref(database, "usuarios/" + user.uid),
                {
                    uid: user.uid,
                    nome: fullName,
                    telefone: phone,
                    email: email,
                    criadoEm: Date.now(),
                    provedor: "email"
                }
            );


            alert("Conta criada com sucesso!");

            window.location.replace("../");


        } catch (error) {

            mostrarErro(error);

            if (button) {

                button.disabled = false;

                button.innerHTML = `
                    Criar conta
                    <i class="fi fi-rr-arrow-right"></i>
                `;
            }
        }

    });

}


// ==========================================
// LOGIN COM GOOGLE
// ==========================================

if (googleLoginBtn) {

    googleLoginBtn.addEventListener("click", async () => {

        try {

            googleLoginBtn.disabled = true;
            googleLoginBtn.textContent = "A abrir Google...";

            await signInWithRedirect(
                auth,
                googleProvider
            );

        } catch (error) {

            mostrarErro(error);

            googleLoginBtn.disabled = false;

            googleLoginBtn.innerHTML = `
                <i class="fi fi-brands-google"></i>
                Google
            `;
        }

    });

}


// ==========================================
// RESULTADO DO LOGIN GOOGLE
// ==========================================

try {

    const result = await getRedirectResult(auth);

    if (result && result.user) {

        const user = result.user;

        console.log(
            "Login Google concluído:",
            user.email
        );


        // Verificar se já existe no Realtime Database
        const userRef =
            ref(database, "usuarios/" + user.uid);

        const snapshot =
            await get(userRef);


        // Se for primeiro login Google,
        // criar perfil no Database
        if (!snapshot.exists()) {

            await set(
                userRef,
                {
                    uid: user.uid,
                    nome: user.displayName || "Utilizador Google",
                    telefone: "",
                    email: user.email || "",
                    foto: user.photoURL || "",
                    criadoEm: Date.now(),
                    provedor: "google"
                }
            );

        }


        window.location.replace("../");
    }

} catch (error) {

    console.error(
        "Erro no retorno do Google:",
        error
    );

    mostrarErro(error);
}


// ==========================================
// REDIRECIONAR SE JÁ ESTIVER LOGADO
// ==========================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log(
            "Utilizador já autenticado:",
            user.uid
        );

    }

});


// ==========================================
// RECUPERAR PALAVRA-PASSE
// ==========================================

const forgotPassword =
    document.querySelector(".auth-link--end");

if (forgotPassword) {

    forgotPassword.addEventListener("click", async (event) => {

        event.preventDefault();

        const emailInput =
            document.querySelector('[name="loginContact"]');

        const email =
            emailInput ? emailInput.value.trim() : "";


        if (!email) {

            alert(
                "Digite o seu e-mail primeiro."
            );

            emailInput?.focus();

            return;
        }


        try {

            await sendPasswordResetEmail(
                auth,
                email
            );

            alert(
                "Enviámos um link para redefinir a sua palavra-passe."
            );

        } catch (error) {

            mostrarErro(error);
        }

    });

}
