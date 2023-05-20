window.addEventListener('DOMContentLoaded', function () {
  function initObjectsCounter() {
    const objectsBlock = document.querySelector('.help__objects');
    if (!objectsBlock) return;

    const sumNode = objectsBlock.querySelector('.help__objects-value');
    const weekNode = objectsBlock.querySelector('.help__objects-week span');

    let sum = +sumNode.dataset.startValue;
    sumNode.textContent = sum;

    const startDate = new Date(sumNode.dataset.startCounter);
    const currentDate = new Date();
    const passedWeeks = +dateDiff('w', startDate, currentDate);

    for (let i = 0; i < passedWeeks; i++) {
      let days = 3;

      if (passedWeeks % 2 == 0) {
        days = 4;
      } else if (passedWeeks % 5 == 0) {
        days = 7;
      } else if (passedWeeks % 3 == 0) {
        days = 3;
      } else if (passedWeeks % 7 == 0) {
        days = 5;
      } else if (passedWeeks % 9 == 0) {
        days = 8;
      } else if (passedWeeks % 11 == 0) {
        days = 9;
      }
      // let days = Math.ceil(Math.random() * 10);

      sum += days;

      sumNode.textContent = sum;
      weekNode.textContent = days;
    }

    // datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
    function dateDiff(datepart, fromdate, todate) {
      datepart = datepart.toLowerCase();
      var diff = todate - fromdate;
      var divideBy = {
        w: 604800000,
        d: 86400000,
        h: 3600000,
        n: 60000,
        s: 1000,
      };

      return Math.floor(diff / divideBy[datepart]);
    }
  }

  function initGallerySlider() {
    if (!document.querySelector('.gallery__inner')) return;

    const swiper = new Swiper('.gallery__inner', {
      loop: true,
      slidesPerView: 'auto',
      speed: 3000,
      freeMode: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
    });
  }

  function initQuiz() {
    const quiz = document.querySelector('.quiz');

    if (!quiz) return;

    quiz.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-next]');

      if (btn) {
        const nextStep = +btn.dataset.next;

        goToStep(nextStep);
      }
    });

    function goToStep(step) {
      const activeStep = document.querySelector('.quiz__step.is-active');
      const nextStep = document.querySelector(
        `.quiz__step[data-step="${step}"]`
      );

      activeStep.classList.remove('is-active');
      nextStep.classList.add('is-active');
    }

  }

  // Forms

  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  phoneInputs.forEach(input => {
    const inputMask = new Inputmask('+7 (999) 99-99-99');
    inputMask.mask(input);
  })

  const rules2 = [
    {
      ruleSelector: '.quiz__input--name',
      rules: [
        {
          rule: 'required',
          value: true,
          errorMessage: 'Введите имя!'
        },
      ]
    },
  ]


  validateForms('.quiz__inner', rules2, {}, '.quiz__step[data-step="2"]')
  validateForms('.quiz__inner', [], {}, '.quiz__step[data-step="3"]', true)
  validateForms('.quiz__inner', [], {}, '.quiz__step[data-step="4"]', true)
  validateForms('.quiz__inner', [], {}, '.quiz__step[data-step="5"]', true)
  

  function validateForms(selector, rules, afterSend, stepNode = selector, checkboxes) {
    const form = document?.querySelector(selector);
    const btn = document.querySelector(stepNode + ' .quiz__btn');
    const telSelector = form?.querySelector('input[type="tel"]');
    const checkboxesSelector = stepNode + ' .quiz__content'; 
  
    if (!form) {
      console.error('Нет такого селектора!');
      return false;
    }
  
    if (telSelector) {
  
      for (let item of rules) {
        if (item.tel) {
          item.rules.push({
            rule: 'function',
            validator: function () {
              const phone = telSelector.inputmask.unmaskedvalue();
              return phone.length === 9;
            },
            errorMessage: item.telError,
          });
        }
      }
    }
  
    const validation = new window.JustValidate(selector, {
      errorLabelStyle: {
        color: '#c30303',
      },
    });

    if (rules) {
      for (let item of rules) {
        validation.addField(item.ruleSelector, item.rules);
      }
    }

    if (checkboxes) {
      validation.addRequiredGroup(
        checkboxesSelector,
        'Выберите хотя-бы один пункт!'
      )
    }

    validation.onValidate((ev) => {
      if (!btn) return;

      if (ev.isValid) {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
    })

    validation.onSuccess((ev) => {
      let formData = new FormData(ev.target);
  
      let xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (afterSend) {
              afterSend();
            }
          }
        }
      };
  
      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
  
      ev.target.reset();
    });
  }

  function validateLastStep() {
    const form = document?.querySelector('.quiz__inner');

    const quizPhone = document.querySelector('.quiz__input--tel');
    const quizSubmit = document.querySelector('.quiz__btn--submit');
    const quizEmail = document.querySelector('.quiz__input--email');
    const quizTerms = document.querySelector('.quiz__terms input');
    const inputs = document.querySelectorAll('.quiz__content--final input');
    let isValid = false;

    inputs.forEach((input) => {
      input.addEventListener('input', function(e) {
        const phoneValid = quizPhone.inputmask.unmaskedvalue().length === 9 ;
        const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(quizEmail.value);
        
        if ((phoneValid || emailValid) && quizTerms.checked) {
            isValid = true;
            quizSubmit.disabled = false;
          }  else {
            isValid = false;
            quizSubmit.disabled = true;
          }
      })
    })


    form.addEventListener('submit', sendForm)
  
    function sendForm(ev) {
      let formData = new FormData(ev.target);
  
      let xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (afterSend) {
              afterSend();
            }
          }
        }
      };
  
      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);
  
      ev.target.reset();
    }
  }

  initObjectsCounter();
  initGallerySlider();
  initQuiz();
  validateLastStep();
});
