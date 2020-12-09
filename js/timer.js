/**
 * Таймер обратного отсчета
Создай плагин настраиваемого таймера, 
который ведет обратный отсчет до предварительно определенной даты. 
Такой плагин может использоваться в блогах и интернет-магазинах, 
страницах регистрации событий, во время технического обслуживания и т. д.

preview

Плагин ожидает следующую HTML-разметку и 
показывает четыре цифры: дни, часы, минуты и секунды 
в формате XX:XX:XX:XX. 
Количество дней может состоять из более чем двух цифр.

<div class="timer" id="timer-1">
  <div class="field">
    <span class="value" data-value="days">11</span>
    <span class="label">Days</span>
  </div>

  <div class="field">
    <span class="value" data-value="hours">11</span>
    <span class="label">Hours</span>
  </div>

  <div class="field">
    <span class="value" data-value="mins">11</span>
    <span class="label">Minutes</span>
  </div>

  <div class="field">
    <span class="value" data-value="secs">11</span>
    <span class="label">Seconds</span>
  </div>
</div>

Плагин это класс CountdownTimer, 
экземпляр которого создает новый таймер с настройками.

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2019'),
});
Для подсчета значений используй следующие готовые формулы, 
где time - разница между targetDate и текущей датой.

/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */

// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
 */

// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */

// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
 */
// const secs = Math.floor((time % (1000 * 60)) / 1000);

// const countDown = new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jul 17, 2019'),
// });


class CountdownTimer {
  constructor ({selector, targetDate}) {
    this.timer = document.querySelector(selector)
    this.targetDate = targetDate
    this.days = document.querySelector('[data-value="days"]')
    this.hours = document.querySelector('[data-value="hours"]')
    this.mins = document.querySelector('[data-value="mins"]')
    this.secs = document.querySelector('[data-value="secs"]')
    this._distance = null;
  }
  promotion() {
    setInterval(() => {
      let distance = this.countDown - this.getCurrentTime()
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.secs = Math.floor((distance % (1000 * 60)) / 1000);
      this.displayData()
      this.distance = distance;
    }, 1000) 
  }
  getCurrentTime() {
    return this.targetDate;
  }
  displayData() {
    this.daysRef.textContent = this._days;
    this.hoursRef.textContent = this._hours;
    this.minsRef.textContent = this._mins;
    this.secsRef.textContent = this._secs;

    if (this.distance < 0) {
      document.body.innerHTML = 'Вы профукали свое время'
      this.clearInterval(this.promotion())
    } 
  }
  init() {
    return this.promotion()
  }
}

const date = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2019'),
});
// CountdownTimer.init()

console.log(date);

