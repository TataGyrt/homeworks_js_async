const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

const POLL_URL = 'https://students.netoservices.ru/nestjs-backend/poll';

async function loadPoll() {
  try {
    const response = await fetch(POLL_URL);

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const { data } = await response.json();

    pollTitle.textContent = data.title;

    pollAnswers.innerHTML = '';

    data.answers.forEach((answerText) => {
      const button = document.createElement('button');
      button.className = 'poll__answer';
      button.textContent = answerText;

      button.addEventListener('click', () => {
        alert('Спасибо, ваш голос засчитан!');
      });

      pollAnswers.append(button);
    });
  } catch (error) {
    console.error(error);
    pollTitle.textContent = 'Не удалось загрузить опрос. Попробуйте позже.';
  }
}

loadPoll();