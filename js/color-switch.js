/**
 * Переключатель цветов
Есть массив цветов в hex-формате и кнопки Start и Stop.

<button type="button" data-action="start">Start</button>
<button type="button" data-action="stop">Stop</button>
const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

Напиши скрипт, который после нажатия кнопки Start, 
раз в секунду меняет цвет фона body на случайное значение 
из массива используя инлайн-стиль. При нажатии на кнопку Stop, 
изменение цвета фона должно останавливаться.

⚠️ Учти, на кнопку Start можно нажать бесконечное количество раз.
Сделай так, чтобы пока изменение темы запушено, кнопка Start была не активна.

Для генерации случайного числа (индекс элемента массива цветов), 
используй функцию randomIntegerFromInterval.

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
 */

 const colors = [
  '#FFFFFF',
  '#2196F3',
  '#4CAF50',
  '#FF9800',
  '#009688',
  '#795548',
];

const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const refs = {
  startBtn: document.querySelector('[data-action="start"]'),
  stopBtn: document.querySelector('[data-action="stop"]'),
  bodyRef: document.querySelector('body'),
}

let timerId;
const beginStart = () => {
  timerId = setInterval(() => {
    refs.bodyRef.style.backgroundColor = colors[randomIntegerFromInterval(0, colors.length - 1)]
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  }, 1000);
}

const clearStop = () => {
  clearInterval(timerId)
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}
refs.startBtn.addEventListener('click', beginStart)
refs.stopBtn.addEventListener('click', clearStop)


