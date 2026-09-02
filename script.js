document.addEventListener('DOMContentLoaded', () => {
    // Seleção dinâmica dos cartões de veículo
    const cards = document.querySelectorAll('.card-option');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    // Navegação (menu logo abaixo do cabeçalho)
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });



    // Painel da conta (avatar no cabeçalho)
    const avatarBtn = document.getElementById('avatarBtn');
    const accountPanel = document.getElementById('accountPanel');

    function closeAccountPanel() {
        avatarBtn.classList.remove('open');
        avatarBtn.setAttribute('aria-expanded', 'false');
        accountPanel.classList.remove('open');
    }

    function toggleAccountPanel() {
        const isOpen = accountPanel.classList.toggle('open');
        avatarBtn.classList.toggle('open', isOpen);
        avatarBtn.setAttribute('aria-expanded', String(isOpen));
    }

    avatarBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAccountPanel();
    });

    document.addEventListener('click', (e) => {
        if (!accountPanel.contains(e.target) && !avatarBtn.contains(e.target)) {
            closeAccountPanel();
        }
    });

    // Seletor de tema (claro / escuro)
    const themeOptions = document.querySelectorAll('.theme-option');

    themeOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            themeOptions.forEach(o => o.classList.remove('active'));
            btn.classList.add('active');
            document.body.classList.toggle('dark-theme', btn.dataset.theme === 'dark');
        });
    });

    // Botão sair
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        // Aqui entra a lógica real de logout (ex: limpar sessão e redirecionar)
        closeAccountPanel();
    });
});


/* ==========================================
   SISTEMA DE NAVEGAÇÃO POR ABAS
========================================== */

const navItems = document.querySelectorAll('.nav-item');

const homeContent = document.getElementById('home-content');
const placeholderContent = document.getElementById('placeholder-content');

const programmingTitle = document.getElementById('programming-title');
const programmingName = document.getElementById('programming-name');


navItems.forEach(item => {

    item.addEventListener('click', function(event) {

        event.preventDefault();

        const tab = this.dataset.tab;


        // Remove estado ativo de todas as abas
        navItems.forEach(nav => {
            nav.classList.remove('active');
        });


        // Ativa a aba clicada
        this.classList.add('active');


        // ==============================
        // HOME
        // ==============================

        if (tab === 'home') {

            homeContent.classList.add('active');
            placeholderContent.classList.remove('active');

            return;
        }


        // ==============================
        // OUTRAS ABAS
        // ==============================

        homeContent.classList.remove('active');
        placeholderContent.classList.add('active');


        const tabNames = {
            viagens: 'Viagens',
            alertas: 'Alertas',
            perfil: 'Perfil'
        };


        const name = tabNames[tab] || 'Esta aba';


        programmingTitle.textContent = name;
        programmingName.textContent = name;

    });

});