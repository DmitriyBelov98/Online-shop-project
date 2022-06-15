const imagePickerElement = document.querySelector('#image-upload-control input');
const imagePreviewElement = document.querySelector('#image-upload-control img');

function updateImagePreview() {
    // получаем массив файлов
    const files = imagePickerElement.files;
    // проверка на нахождение файла
    if(!files || files.length === 0 )  {
       imagePreviewElement.style.display = 'none';
        return;
    }
    // берём первый элемент из массива файлов
    const pickedFile = files[0];
    // генерация url на локальных машинах юзеров и добавление в src (путь)
    imagePreviewElement.src =  URL.createObjectURL(pickedFile); 
    // показать стили
    imagePreviewElement.style.display = 'block';
}

imagePickerElement.addEventListener('change', updateImagePreview);