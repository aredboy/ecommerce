import productController from "../controllers/products.js";



console.warn('🆗: Módulo PageInicio cargado.');

class PageInicio {

static async renderTemplateCards(products) {
    const textoToRender = await fetch('./templates/cards.hbs').then(r => r.text());
    const template = Handlebars.compile(textoToRender);
    const html = template({ products });
    document.querySelector('.cards-container').innerHTML = html;
}

static async init () {
    
    const products = await productController.getProducts();
    console.log('PageInicio.init()');
    PageInicio.renderTemplateCards(products);
    
    console.log(`Se encontraron ${products.length} productos.`);
}
};

export default PageInicio;

"use strict";
/////// Cart ///////

///variables///

const cartTotalPrice = document.querySelector(".cart-modal__price");
const cartContent = document.querySelector(".cart-modal__content");

/// funciones ///

const createAndDeleteCartToy = product => {
    const cartToy = document.createElement("div");
    cartToy.classList.add("cart-toy");
    cartToy.innerHTML = `
        <div class="cart-toy__container">
            <p class="cart-toy__id">${product.id}</p>
            <div class="cart-toy__img-container">
                <img class="cart-toy__img" src="${product.image}" alt="Imagen del producto">
            </div>
            <div class="cart-toy__text-container">
                <p class="cart-toy__title">${product.title}</p>
                <p class="cart-toy__price">${product.price}</p>
            </div>
            <div class="cart-toy__quantity-container">
                <button class="cart-toy__btn cart-toy__btn--minus">-</button>
                <input type="number" value="1" class="cart-toy__quantity-input"/>
                <button class="cart-toy__btn cart-toy__btn--plus">+</button>
            </div>
            <div class='cart-toy__subtotal-container'>
                <p class="cart-toy__subtotal-quote">Subtotal</p>
                <p class="cart-toy__subtotal-price"></p>	
            </div>
            <div class="cart-toy__close-container">
                <i class="fa-regular fa-solid fa-xmark cart-toy__close"></i>
            </div>
            <div class="cart-toy__separator"></div>
        </div>
            `;

    cartContent.insertAdjacentElement("afterbegin", cartToy);
    document.addEventListener("click", e => {
        if (e.target.classList.contains("cart-toy__close")) {
            e.target.closest('.cart-toy__container').remove();
            toyRemovedFromCart();
            updatePriceTotals();
        }
    });
};



const calculateToySubtotalPrice = () => {
    const cartToy = document.querySelectorAll(".cart-toy__container");
    cartToy.forEach(toy => {
        const cartToyPrice = toy.querySelector(".cart-toy__price");
        const cartToyQuantityInput = toy.querySelector(".cart-toy__quantity-input");
        const cartToySubtotalPrice = toy.querySelector(".cart-toy__subtotal-price");
        const priceNumber = Number(cartToyPrice.textContent.replace("$", ""));
        const quantityNumber = Number(cartToyQuantityInput.value);
        cartToySubtotalPrice.textContent = `$${priceNumber * quantityNumber}`;
    });
};

const calculateCartTotalPrice = () => {
    const cartToys = document.querySelectorAll(".cart-toy__container");
    let totalPrice = 0;
    cartToys.forEach(toy => {
        const toyPrice = toy.querySelector(".cart-toy__price").innerText;
        const toyQuantity = toy.querySelector(".cart-toy__quantity-input").value;
        const toyPriceNumber = Number(toyPrice.replace("$", ""));
        totalPrice += toyPriceNumber * toyQuantity;
    });
    cartTotalPrice.innerText = `$${totalPrice}`;
};

const quantityInputUpdateTotals = () => {
const cartToyQuantityInput = document.querySelectorAll(".cart-toy__quantity-input");
    cartToyQuantityInput.forEach(input => {
        input.addEventListener("change", () => {
            if (input.value < 1) {
                input.value = 1;
            }
            updatePriceTotals();
        });
    });
};

const updatePriceTotals = () => {
    calculateCartTotalPrice();
    calculateToySubtotalPrice();
};

const toyAddedToCart = () => {
    const toyAddedToCartWindow = document.createElement("div");
    toyAddedToCartWindow.classList.add("message-container--success");
    toyAddedToCartWindow.innerHTML = `
        <div class="message-container message-container__success">
            <p class="message-container__text">¡Producto agregado al carrito!</p>
        </div>`;
    document.body.insertAdjacentElement("afterbegin", toyAddedToCartWindow);
    setTimeout(() => {
        toyAddedToCartWindow.remove();
    }, 1200);
}

const toyRemovedFromCart = () => {
    const toyRemovedFromCartWindow = document.createElement("div");
    toyRemovedFromCartWindow.classList.add("message-container--error");
    toyRemovedFromCartWindow.innerHTML = `
        <div class="message-container message-container__eliminated">
            <p class="message-container__text">Producto eliminado del carrito.</p>
        </div>`;
    document.body.insertAdjacentElement("afterbegin", toyRemovedFromCartWindow);
    setTimeout(() => {
        toyRemovedFromCartWindow.remove();
    }, 1200);
    updatePriceTotals();
};

const checkIfToyIsInCart = product => {
    const cartToyID = document.querySelectorAll(".cart-toy__id");
    let toyIsInCart = false;
    cartToyID.forEach(id => {
        if (id.textContent == product.id) {
            toyIsInCart = true;
            toyAddedToCart();
        }
    });
    return toyIsInCart;
};

const addToCart = product => {
    const cartToyQuantityInput = document.querySelectorAll(".cart-toy__quantity-input");
    if (checkIfToyIsInCart(product)) {
        cartToyQuantityInput.forEach(quantity => {
            if (quantity.closest(".cart-toy__container").querySelector(".cart-toy__id").textContent == product.id) {
                quantity.value++;
                updatePriceTotals();
            }
        });
    } else {
        createAndDeleteCartToy(product);
        quantityInputUpdateTotals();
        toyAddedToCart();
        updatePriceTotals();
    }
};

/// event listeners ///


document.addEventListener("click", e => {
    if (e.target.classList.contains("card__link-add")) {
        e.preventDefault()
        const product = {
            image: e.target.closest(".card").querySelector(".card__image").src,
            title: e.target.closest(".card").querySelector(".card__heading").textContent,
            price: e.target.closest(".card").querySelector(".card__price").textContent,
            id : e.target.closest(".card").querySelector(".card__id").textContent
        };
        addToCart(product);
    }
});

document.addEventListener("click", e => {
    if (e.target.closest(".cart-toy__btn--plus")) {
        const input = e.target.previousElementSibling;
        input.value = Number(input.value) + 1;
        updatePriceTotals();
    }
});

document.addEventListener("click", e => {
    if (e.target.closest(".cart-toy__btn--minus")) {
        const input = e.target.nextElementSibling;
        if (input.value > 1) {
            input.value = Number(input.value) - 1;
            updatePriceTotals();
        } else {
            e.target.closest(".cart-toy__container").remove();
            toyRemovedFromCart();
        }
    }
});




////

        // async function renderCartToy(toy) {
        //     const textToCompile = await fetch(
        //         "./templates/card-toy.hbs"
        //     ).then((response) => response.text());
        //     console.log(toy);
        //     const template = Handlebars.compile(textToCompile);
        //     const resultText = template(toy);
        //     cartToysContainer.innerHTML += resultText;
        // }
        
        // function select() {
        //     selectToy.addEventListener("click", (e) => {
        //         if (e.target.classList.contains("card__link-add")) {
        //             let id = e.target.getAttribute("data-id");
        //             let foundToy = toys.find((toy) => toy.id == id);
        //             renderCartToy(foundToy);
        //         }
        //     });
        // }

        // select();


        // document
        //     .querySelector(".cards-container")
        //     .addEventListener("click", (e) => {
        //         if (e.target.classList.contains("card__link-add")) {
        //             e.target.classList.add("card__link-add--added");
        //             let card = e.target.closest(".card");
        //             card.classList.add("comprado");
        //             card.querySelector(".card__heading").innerHTML +=
        //                 "(Agregado al Carrito!)";
        //             card.querySelector(".card__heading").style.color = "551a8b";
        //             card.querySelector(".card__link-add").innerHTML =
        //                 "Agregado";
        //         }
        //     });



