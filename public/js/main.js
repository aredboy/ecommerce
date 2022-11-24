
class Main {

    async ajax(url, method = 'get') {
        return await fetch(url, { method: method }).then(r => r.text());
    }

    getIdFromHash() {
        let id = location.hash.slice(1);
        if (id[0] === '/') {
            id = id.slice(1);
        }
        return id || 'inicio';
    }

    getViewUrlFromId(id) {
        return `views/${id}.html`;
    }

    getModuleUrlFromId(id) {
        return `./modules/${id}.js`;
    }

    setActiveLink(id) {
        const links = document.querySelectorAll('.main-nav__link');
        links.forEach(link => {
            if (link.getAttribute('href') === `#/${id}`) {
                link.classList.add('main-nav__link--active');
                link.ariaCurrent = 'page';
            } else {
                link.classList.remove('main-nav__link--active');
                link.removeAttribute('aria-current');
            }
        });
    }

    async initJS(id) {
        const moduleUrl = this.getModuleUrlFromId(id);
        try {
            const {default: module} = await import(moduleUrl);
            if (typeof module.init !== 'function') {
                console.error(`El módulo ${id} no posee un método init().`);
                return;
            }
            module.init();
        } catch (error) {
            console.error(`No se pudo importar el módulo ${moduleUrl}.`);
        }
    }

    async loadTemplate() {
        const id = this.getIdFromHash();
        
        const viewUrl = this.getViewUrlFromId(id);
        const viewContent = await this.ajax(viewUrl);
        document.querySelector('main').innerHTML = viewContent;

        this.setActiveLink(id);

        this.initJS(id);
    }

    async loadTemplates() {
        this.loadTemplate();
        window.addEventListener('hashchange', () => this.loadTemplate());
    }

    async start() {
        await this.loadTemplates();
    }
}

const main = new Main();
main.start();

// Variables //

const cartButton = document.querySelector(".cart-button-image");
const cartBack = document.querySelector(".cart-modal__back");
const cartContent = document.querySelector(".cart-modal__content");
const cartCloseButton = document.querySelector(".cart-modal__close");

// Functions //

const closeCartModal = () => {
    setTimeout(() => {
        cartContent.classList.add("cart-modal__content--transform-out");
    }, 200);
    setTimeout(() => {
        cartBack.classList.remove("cart-modal__back--visible");
        cartContent.classList.remove("cart-modal__content--visible");
        cartContent.classList.remove("cart-modal__content--transform-out");
    }, 300);
}


////// event listeners

document.addEventListener("click", e => {
    if (e.target === cartButton) {
        cartBack.classList.toggle("cart-modal__back--visible");
        cartContent.classList.toggle("cart-modal__content--visible");
    } else if (e.target === cartBack || e.target === cartCloseButton) {
        closeCartModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeCartModal();
    }  
});




       ////// funcionaba

    // const openModal = document.querySelectorAll("[data-open]");
    // const closeModal = document.querySelectorAll("[data-close]");
    // const isVisible = "is-visible";

    // for (const mod of openModal) {
    //     mod.addEventListener("click", function () {
    //         const modalId = this.dataset.open;
    //         document.getElementById(modalId).classList.add(isVisible);
    //     });
    // }

    // for (const mod of closeModal) {
    //     mod.addEventListener("click", function () {
    //         this.parentElement.parentElement.classList.remove(isVisible);
    //     });
    // }

    // window.addEventListener("click", (e) => {
    //     if (
    //         e.target ===
    //         document.querySelector("main-header__cart-modal.is-visible")
    //     ) {
    //         document
    //             .querySelector("main-header__cart-modal.is-visible")
    //             .classList.remove(isVisible);
    //     }
    // });


////// no funcionaba




       // document.addEventListener("click", e => {
       //     if (e.target == document.querySelector("main-header__cart-modal.is-visible")) {
       //         // console.log("hola");
       //     document.querySelector("main-header__cart-modal.is-visible").classList.remove(isVisible);
       //     }
       // });

       // document.addEventListener("keyup", e => {
       //     if (e.key == "Escape" && document.querySelector("main-header__cart-modal.is-visible")) {
       //     document.querySelector("main-header__cart-modal.is-visible").classList.remove(isVisible);
       //     }
       // });
