const form = document.getElementById('form');
const fileInput = document.getElementById('file');
const progress = document.getElementById('progress');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!fileInput.files.length) {
    return;
  }

  progress.value = 0;

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');

  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      progress.value = e.loaded / e.total;
    }
  });

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      progress.value = 1;
      console.log('Файл успешно загружен:', xhr.responseText);
    } else {
      console.error('Ошибка загрузки:', xhr.status, xhr.statusText);
    }
  });

  xhr.addEventListener('error', () => {
    console.error('Произошла ошибка при отправке запроса');
  });

  xhr.send(formData);
});