

const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-managment');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartBadge = document.querySelector('.nav-items .badge');

async function updateCartItem(event) {
    event.preventDefault();
    const form = event.target;

    const productId = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
    const quantity = form.firstElementChild.value; // получить значение в инпуте
    let response;
    try {
         response = await fetch('/cart/items', {
            method: 'PATCH',
            body: JSON.stringify({
                productId: productId,
                quantity: quantity,
                _csrf: csrfToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        alert('Something went wrong!');
        return;
    }

    if(!response.ok) {
        alert('Something went wrong!');
        return;
    }

    const responseData = await response.json();
    // проверка на наличие товара
    if(responseData.updateCartData.updatedItemPrice === 0) {
        form.parentElement.parentElement.remove();
    } else {
        // обновление только в случае присутствия товара
        const cartItemTotalPrice = form.parentElement.querySelector('.cart-item-price');
        cartItemTotalPrice.textContent = responseData.updateCartData.updatedItemPrice.toFixed(2);
    }
    // получение элементов где нужно произвести обновление
   


    cartTotalPrice.textContent = responseData.updateCartData.newTotalPrice.toFixed(2);


    cartBadge.textContent = responseData.updateCartData.newTotalQuantity;

    

  
}
for (const formElement of cartItemUpdateFormElements) {
    formElement.addEventListener('submit', updateCartItem);
}