const screens = document.querySelectorAll('.screen');
const bottomNav = document.getElementById('bottom-nav');
const navItems = document.querySelectorAll('.nav-item');
const fabPublish = document.getElementById('fab-publish');
const toast = document.getElementById('toast');
const backButtons = document.querySelectorAll('.back-btn');

const appState = {
    name: 'Usuario Demo',
    role: 'Agricultor',
    currentProduct: 'Yuca',
    currentSeller: 'Don Carlos R.'
};

const sellersData = {
    Yuca: {
        seller: 'Don Carlos R.',
        summary: '12 ventas cerradas · 4.9/5',
        reviews: [
            'Entrega puntual y producto fresco.',
            'Comunicación clara durante la compra.',
            'Buena presentación del producto.'
        ],
        deliveryPoint: 'Plaza central del mercado',
        deliveryTime: 'Mañana, 8:30 a. m.'
    },
    'Plátano': {
        seller: 'María Tovar',
        summary: '9 ventas cerradas · 4.8/5',
        reviews: [
            'Muy cumplida con la hora acordada.',
            'Producto en excelente estado.',
            'Recomendada para compras semanales.'
        ],
        deliveryPoint: 'Parque de la vereda El Progreso',
        deliveryTime: 'Hoy, 4:30 p. m.'
    },
    Mango: {
        seller: 'Jhon Mendoza',
        summary: '15 ventas cerradas · 4.7/5',
        reviews: [
            'Buen precio y trato amable.',
            'Llegó con la cantidad completa.',
            'Proceso de compra muy rapido.'
        ],
        deliveryPoint: 'Entrada de la cooperativa agraria',
        deliveryTime: 'Mañana, 10:00 a. m.'
    }
};

const screenHistory = ['screen-welcome'];

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 1800);
}

function showScreen(screenId) {
    const currentScreenId = screenHistory[screenHistory.length - 1];
    if (currentScreenId !== screenId) {
        screenHistory.push(screenId);
    }

    screens.forEach((screen) => {
        if (screen.id === screenId) {
            screen.classList.add('active');
        } else {
            screen.classList.remove('active');
        }
    });

    const appAreaScreens = ['screen-home', 'screen-publish', 'screen-chat', 'screen-profile'];
    const inMainFlow = appAreaScreens.includes(screenId);
    bottomNav.classList.toggle('hidden', !inMainFlow);

    const showFab = screenId === 'screen-home';
    fabPublish.classList.toggle('hidden', !showFab);

    navItems.forEach((item) => {
        const isActive = item.getAttribute('data-target') === screenId;
        item.classList.toggle('active', isActive);
    });

    if (screenId === 'screen-profile') {
        document.getElementById('profile-name').textContent = appState.name;
        document.getElementById('profile-role').textContent = appState.role;
    }
}

function updateChatSellerInfo(productName) {
    const fallback = sellersData.Yuca;
    const info = sellersData[productName] || fallback;

    appState.currentProduct = productName;
    appState.currentSeller = info.seller;

    document.getElementById('chat-seller-name').textContent = info.seller;
    document.getElementById('chat-seller-summary').textContent = info.summary;

    const reviewsContainer = document.getElementById('chat-reviews');
    reviewsContainer.innerHTML = '';
    info.reviews.forEach((review) => {
        const item = document.createElement('span');
        item.textContent = `• ${review}`;
        reviewsContainer.appendChild(item);
    });

    document.getElementById('delivery-point').textContent = info.deliveryPoint;
    document.getElementById('delivery-time').textContent = info.deliveryTime;
    document.getElementById('delivery-info').classList.add('hidden');
}

function goBack() {
    if (screenHistory.length > 1) {
        screenHistory.pop();
    }

    const previousScreenId = screenHistory[screenHistory.length - 1] || 'screen-welcome';

    screens.forEach((screen) => {
        if (screen.id === previousScreenId) {
            screen.classList.add('active');
        } else {
            screen.classList.remove('active');
        }
    });

    const appAreaScreens = ['screen-home', 'screen-publish', 'screen-chat', 'screen-profile'];
    const inMainFlow = appAreaScreens.includes(previousScreenId);
    bottomNav.classList.toggle('hidden', !inMainFlow);

    const showFab = previousScreenId === 'screen-home';
    fabPublish.classList.toggle('hidden', !showFab);

    navItems.forEach((item) => {
        const isActive = item.getAttribute('data-target') === previousScreenId;
        item.classList.toggle('active', isActive);
    });

    if (previousScreenId === 'screen-profile') {
        document.getElementById('profile-name').textContent = appState.name;
        document.getElementById('profile-role').textContent = appState.role;
    }
}

document.getElementById('btn-start').addEventListener('click', () => {
    showScreen('screen-register');
});

backButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const backTarget = button.getAttribute('data-back');
        if (backTarget === 'screen-welcome') {
            screenHistory.length = 1;
            showScreen('screen-welcome');
            return;
        }

        goBack();
    });
});

document.getElementById('btn-register').addEventListener('click', () => {
    const nameInput = document.getElementById('name').value.trim();
    const roleInput = document.getElementById('role').value;

    appState.name = nameInput || 'Usuario Demo';
    appState.role = roleInput;

    showToast('Registro exitoso');
    setTimeout(() => {
        showScreen('screen-home');
    }, 450);
});

document.querySelectorAll('.contact-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const product = btn.getAttribute('data-product');
        const seller = btn.getAttribute('data-seller') || 'Vendedor local';
        document.getElementById('chat-context').textContent = `Conversación sobre: ${product} · ${seller}`;
        updateChatSellerInfo(product);
        showToast(`Contacto iniciado por ${product}`);
        showScreen('screen-chat');
    });
});

document.getElementById('btn-publish').addEventListener('click', () => {
    document.getElementById('product-name').value = '';
    document.getElementById('product-qty').value = '';
    document.getElementById('product-price').value = '';
    showToast('Producto publicado con éxito');
    setTimeout(() => {
        showScreen('screen-home');
    }, 450);
});

fabPublish.addEventListener('click', () => {
    showScreen('screen-publish');
});

navItems.forEach((item) => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        showScreen(target);
    });
});

document.getElementById('btn-send').addEventListener('click', () => {
    const input = document.getElementById('chat-input');
    const value = input.value.trim();

    if (!value) {
        showToast('Escribe un mensaje para continuar');
        return;
    }

    const chatBox = document.getElementById('chat-box');
    const msg = document.createElement('div');
    msg.classList.add('msg', 'buyer');
    msg.textContent = `Tú: ${value}`;
    chatBox.appendChild(msg);
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
    showToast('Mensaje enviado');
});

document.getElementById('btn-close-deal').addEventListener('click', () => {
    const deliveryInfo = document.getElementById('delivery-info');
    deliveryInfo.classList.remove('hidden');
    showToast('Venta realizada con éxito 🎉 Revisa punto y hora de entrega');
});

document.getElementById('btn-logout').addEventListener('click', () => {
    document.getElementById('name').value = '';
    document.getElementById('role').value = 'Agricultor';
    document.getElementById('chat-input').value = '';
    showToast('Sesión cerrada');
    setTimeout(() => {
        screenHistory.length = 1;
        showScreen('screen-welcome');
    }, 350);
});

document.getElementById('chat-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('btn-send').click();
    }
});

updateChatSellerInfo('Yuca');
