document.addEventListener('DOMContentLoaded', () => {

    // Alternância entre "Entrar" e "Criar conta"
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    const switchLinks = document.querySelectorAll('.auth-switch-link');
    const tagline = document.getElementById('authTagline');

    const taglines = {
        login: 'Entre para continuar a sua viagem',
        cadastro: 'Crie a sua conta e comece a viajar'
    };

    function activateTab(tabName) {
        tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
        forms.forEach(f => f.classList.toggle('active', f.id === `${tabName}Form`));
        if (tagline) tagline.textContent = taglines[tabName] || taglines.login;
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => activateTab(tab.dataset.tab));
    });

    switchLinks.forEach(link => {
        link.addEventListener('click', () => activateTab(link.dataset.switch));
    });

    // Mostrar/ocultar palavra-passe
    const toggles = document.querySelectorAll('.field-toggle');

    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.querySelector(`[name="${btn.dataset.target}"]`);
            if (!input) return;
            const icon = btn.querySelector('i');
            const isHidden = input.type === 'password';
            input.type = isHidden ? 'text' : 'password';
            icon.classList.toggle('fi-rr-eye', !isHidden);
            icon.classList.toggle('fi-rr-eye-crossed', isHidden);
        });
    });

    // Validação simples do formulário de login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Aqui entra a lógica real de autenticação
        console.log('Entrar:', Object.fromEntries(new FormData(loginForm)));
    });

    // Validação do formulário de cadastro (confirmação de palavra-passe)
    const cadastroForm = document.getElementById('cadastroForm');
    const passwordError = document.getElementById('passwordError');

    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const password = cadastroForm.querySelector('[name="signupPassword"]').value;
        const confirm = cadastroForm.querySelector('[name="confirmPassword"]').value;

        if (password !== confirm) {
            passwordError.classList.add('visible');
            return;
        }

        passwordError.classList.remove('visible');
        // Aqui entra a lógica real de criação de conta
        console.log('Criar conta:', Object.fromEntries(new FormData(cadastroForm)));
    });

    // Alternar tema claro/escuro
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeToggleIcon = document.getElementById('themeToggleIcon');

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        themeToggleIcon.classList.toggle('fi-rr-moon', !isDark);
        themeToggleIcon.classList.toggle('fi-rr-sun', isDark);
    });
});
