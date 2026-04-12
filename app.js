const screens = document.querySelectorAll('.screen');
const bottomNav = document.getElementById('bottom-nav');
const navItems = document.querySelectorAll('.nav-item');
const fabPublish = document.getElementById('fab-publish');
const toast = document.getElementById('toast');

const appState = {
    name: 'Usuario Demo',
    role: 'Agricultor'
};

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 1800);
}

function showScreen(screenId) {
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

document.getElementById('btn-start').addEventListener('click', () => {
    showScreen('screen-register');
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
        document.getElementById('chat-context').textContent = `Conversación sobre: ${product}`;
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
    showToast('Venta realizada con éxito 🎉');
});

document.getElementById('btn-logout').addEventListener('click', () => {
    document.getElementById('name').value = '';
    document.getElementById('role').value = 'Agricultor';
    document.getElementById('chat-input').value = '';
    showToast('Sesión cerrada');
    setTimeout(() => {
        showScreen('screen-welcome');
    }, 350);
});

document.getElementById('chat-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('btn-send').click();
    }
});
