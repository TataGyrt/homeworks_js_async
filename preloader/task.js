const itemsContainer = document.getElementById('items');
const loader = document.getElementById('loader');

async function loadCurrency() {
  try {
    const response = await fetch(
      'https://students.netoservices.ru/nestjs-backend/slow-get-courses'
    );

    if (!response.ok) {
      throw new Error('Ошибка HTTP: ' + response.status);
    }

    const data = await response.json();
    const valutes = data.response.Valute;

    itemsContainer.innerHTML = '';

    Object.values(valutes).forEach((valute) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('item');
      itemElement.innerHTML = `
        <div class="item__code">${valute.CharCode}</div>
        <div class="item__value">${valute.Value}</div>
        <div class="item__currency">руб.</div>
      `;
      itemsContainer.appendChild(itemElement);
    });
  } catch (error) {
    console.error('Ошибка при загрузке курса валют:', error);
  } finally {
    loader.classList.remove('loader_active');
  }
}

loadCurrency();