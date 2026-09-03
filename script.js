document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
// BOTTOM SHEET — SELEÇÃO DE TRANSPORTE
// ==========================================

const cards = document.querySelectorAll('.card-option');

const transportOverlay = document.getElementById('transportOverlay');
const transportSheet = document.getElementById('transportSheet');

const sheetVehicleImage = document.getElementById('sheetVehicleImage');
const sheetVehicleName = document.getElementById('sheetVehicleName');
const sheetVehicleBadge = document.getElementById('sheetVehicleBadge');
const sheetVehicleDescription = document.getElementById('sheetVehicleDescription');
const sheetVehiclePrice = document.getElementById('sheetVehiclePrice');

const closeTransportSheet = document.getElementById('closeTransportSheet');

const continueWhatsapp = document.getElementById('continueWhatsapp');
const continueWebsite = document.getElementById('continueWebsite');


// Dados dos transportes
const transportData = {

    txopela: {
        name: 'TXOPELA',
        image: 'images/txopela.png',
        badge: '10% OFF',
        badgeClass: 'badge-discount',
        description: 'O clássico de três rodas, ideal para fugir do trânsito e chegar rapidamente ao seu destino.',
        price: '107'
    },

    eco: {
        name: 'CARRO ECO',
        image: 'images/carro.png',
        badge: 'PREÇO REDUZIDO',
        badgeClass: 'badge-reduced',
        description: 'Uma opção confortável e climatizada para quem procura uma viagem mais tranquila e confortável.',
        price: '175'
    },

    moto: {
        name: 'MOTOTAXI',
        image: 'images/mota.png',
        badge: 'NOVO',
        badgeClass: 'badge-new',
        description: 'Uma forma rápida e prática de chegar ao seu destino, especialmente para trajetos urbanos.',
        price: '50'
    }

};


// Abrir Bottom Sheet
function openTransportSheet(vehicle) {

    const data = transportData[vehicle];

    if (!data) return;


    // Preencher dados
    sheetVehicleImage.src = data.image;
    sheetVehicleImage.alt = data.name;

    sheetVehicleName.textContent = data.name;

    sheetVehicleBadge.textContent = data.badge;

    sheetVehicleBadge.className = 'badge ' + data.badgeClass;

    sheetVehicleDescription.textContent = data.description;

    sheetVehiclePrice.textContent = data.price;


    // Mostrar
    transportOverlay.classList.add('open');
    transportSheet.classList.add('open');

    document.body.style.overflow = 'hidden';
}


// Fechar Bottom Sheet
function closeTransportModal() {

    transportOverlay.classList.remove('open');
    transportSheet.classList.remove('open');

    document.body.style.overflow = '';

}


// Clique nos transportes
cards.forEach(card => {

    card.addEventListener('click', () => {

        cards.forEach(c => c.classList.remove('active'));

        card.classList.add('active');

        const vehicle = card.dataset.vehicle;

        openTransportSheet(vehicle);

    });

});


// Fechar pelo botão
closeTransportSheet.addEventListener('click', closeTransportModal);


// Fechar tocando fora
transportOverlay.addEventListener('click', closeTransportModal);


// Fechar com ESC no computador
document.addEventListener('keydown', event => {

    if (event.key === 'Escape') {
        closeTransportModal();
    }

});


// ==========================================
// CONTINUAR PELO WHATSAPP
// ==========================================

continueWhatsapp.addEventListener('click', () => {

    const selectedCard = document.querySelector('.card-option.active');

    if (!selectedCard) return;

    const vehicle = selectedCard.dataset.vehicle;

    const data = transportData[vehicle];

    const message =
        `Olá, VilaTáxi! Gostaria de solicitar um ${data.name}.`;

    const whatsappNumber = '258XXXXXXXXX';

    const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

});


// ==========================================
// CONTINUAR PELO SITE
// ==========================================

continueWebsite.addEventListener('click', () => {

    const selectedCard = document.querySelector('.card-option.active');

    if (!selectedCard) return;

    const vehicle = selectedCard.dataset.vehicle;

    // Evita vários cliques
    continueWebsite.disabled = true;

    // Guarda o conteúdo original
    const originalContent = continueWebsite.innerHTML;

    // Mostra o progresso giratório
    continueWebsite.innerHTML = `
        <span class="site-loading">
            <span class="site-spinner"></span>
            <span>
                <strong>A preparar a viagem...</strong>
                <small>Por favor aguarde</small>
            </span>
        </span>
    `;

    // Pequeno tempo para o utilizador visualizar o progresso
    setTimeout(() => {

        window.location.href =
            `viagem/pedirviagem.html?transporte=${encodeURIComponent(vehicle)}`;

    }, 700);

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
