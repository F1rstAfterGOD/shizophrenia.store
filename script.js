const products = [
    {
        id: 1,
        name: "ZIP-HOODIE | phentagram",
        price: 4500,
        images: ["images/zip1.png", "images/zip2.png", "images/phento.jpg"],
        description: "Материалы: \n Спина Зип-худи выполнена из самой лучшей в мире Шелкографией \n Перед-вышивка \n Капишон-вышивка"
    },
    {
        id: 2,
        name: "It is a great honor to be meak (SOLD OUT)",
        price: 99999,
        images: ["images/long1.png", "images/long2.png", "images/123123.jpg"],
        description: "Материалы: \n футер трехнитка \n страптные ленты (плотные) \n фулл машинная вышивка \n"
    },
    {
        id: 3,
        name: "ANONS",
        price: 99999,
        images: ["перс.png", "images/jacket_1.jpg", "images/jacket_2.jpg"],
        description: "Водонепроницаемая, 60% нейлон."
    }
];

let cart = [];

function displayProducts() {
    const productContainer = document.getElementById('products');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-slider';
        
        productElement.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}" class="main-image" style="width:100%;">
            <h3>${product.name}</h3>
            <p>Цена: ${product.price} руб.</p>
            <button onclick="showDetails(${product.id})">Купить</button>
        `;
        productContainer.appendChild(productElement);
    });
}

function showDetails(productId) {
    const product = products.find(p => p.id === productId);
    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-image').src = product.images[0];
    document.getElementById('product-description').innerText = product.description;

    // Отображаем миниатюры
    const thumbnailsContainer = document.querySelector('.product-thumbnails');
    thumbnailsContainer.innerHTML = product.images.map(image => `
        <img src="${image}" alt="${product.name}" onclick="changeImage('${image}')" style="width: 100px; cursor: pointer;">
    `).join('');

    // Устанавливаем событие для добавления в корзину
    const addButton = document.getElementById('add-to-cart');
    addButton.onclick = function() {
        const size = document.getElementById('size').value;
        addToCart(productId, size);
    };

    document.getElementById('product-details').style.display = 'block'; // Показываем модальное окно
}

function changeImage(imageUrl) {
    document.getElementById('product-image').src = imageUrl; // Меняем основное изображение
}

function addToCart(productId, size) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItem = { ...product, size }; // Создание копии продукта с добавленным размером
        cart.push(cartItem); // Добавляем в корзину
        updateCartCount();
        document.getElementById('add-to-cart').style.display = 'none'; // Это скроет кнопку // Закрываем модал после добавления в корзину
    }
}

function updateCartCount() {
    const cartButton = document.getElementById('cart-button');
    cartButton.innerText = `Корзина (${cart.length})`;
}

document.getElementById('cart-button').onclick = function() {
    displayCart();
}

document.getElementById('close-cart').onclick = function() {
    document.getElementById('cart').style.display = 'none';
}

document.getElementById('close-details').onclick = function() {
    document.getElementById('product-details').style.display = 'none'; // Закрываем модал при клике
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} руб., размер: ${item.size}`;
        cartItems.appendChild(li);
    });
    document.getElementById('cart').style.display = 'block';
}

displayProducts();

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('checkout').onclick = function() {
        window.location.href = 'https://t.me/shizoprogressive_bot';
    };
});

function animateElements() {
    const header = document.getElementById('header');
    const nav = document.getElementById('nav');
    const main = document.getElementById('main');
    const button = document.getElementById('button');

    // Задержка для каждого элемента
    header.style.animationDelay = '0s';
    nav.style.animationDelay = '0.5s';
    main.style.animationDelay = '1s';
    button.style.animationDelay = '1.5s';

    // Применяем анимацию
    header.style.animation = 'appear 0.5s forwards';
    nav.style.animation = 'appear 0.5s forwards';
    main.style.animation = 'appear 0.5s forwards';
    button.style.animation = 'appear 0.5s forwards';
}

let isDragging = false;
let startY;
let scrollTop;

const modalContent = document.querySelector(".modal-content");

// Обработчик события для начала перетаскивания
modalContent.addEventListener("mousedown", (e) => {
    isDragging = true;
    startY = e.pageY - modalContent.offsetTop;
    scrollTop = modalContent.scrollTop;
    modalContent.style.cursor = "grabbing"; // Изменение курсора
});

// Обработчик события для выхода из области содержимого
modalContent.addEventListener("mouseleave", () => {
    isDragging = false;
    modalContent.style.cursor = "grab"; // Возврат курсора
});

// Обработчик события для завершения перетаскивания
modalContent.addEventListener("mouseup", () => {
    isDragging = false;
    modalContent.style.cursor = "grab"; // Возврат курсора
});

// Обработчик события для перемещения мыши
modalContent.addEventListener("mousemove", (e) => {
    if (!isDragging) return; // Если не перетаскиваем, выходим
    e.preventDefault();
    const y = e.pageY - modalContent.offsetTop;
    const walk = (y - startY) * 2; // Увеличьте скорость прокрутки
    modalContent.scrollTop = scrollTop - walk; // Прокрутка содержимого
});

// Функция для открытия модельного окна
function openModal() {
    const modal = document.getElementById("cart");
    modal.style.display = "block"; // Показываем модельное окно
}

// Функция для закрытия модельного окна
function closeModal() {
    const modal = document.getElementById("cart");
    modal.style.display = "none"; // Скрываем модельное окно
}

// Закрытие модельного окна при нажатии клавиши Esc
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

// Пример вызова функции открытия модального окна
document.getElementById("checkout").addEventListener("click", openModal);
document.getElementById("close-cart").addEventListener("click", closeModal);