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

   


    // Alternar tema claro/escuro
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeToggleIcon = document.getElementById('themeToggleIcon');

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        themeToggleIcon.classList.toggle('fi-rr-moon', !isDark);
        themeToggleIcon.classList.toggle('fi-rr-sun', isDark);
    });
});
