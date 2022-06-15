const deleteProductBtnElements = document.querySelectorAll('.product-item button');


async function deleteProduct(event) {
    // получение события по каждой кнопке
    const buttonElement = event.target;
    // получение id через установленный data атрибут
    const productId = buttonElement.dataset.productid;
    // получение csrf через data атрибут
    let csrfToken = buttonElement.dataset.csrf;
    
    const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
        method: 'DELETE'

    });

    if(!response.ok) {
        alert('Something went wrong');
        return;
    }
    buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}
for (const deleteProductBtnElement of deleteProductBtnElements) {
    deleteProductBtnElement.addEventListener('click', deleteProduct);
}

