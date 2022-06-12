const mobileMenuElement = document.getElementById('mobile-menu');
const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');


function toggleMobileMenu() {
    mobileMenuElement.classList.toggle('open');
}
mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);