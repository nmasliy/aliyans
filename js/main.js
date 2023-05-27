window.addEventListener("DOMContentLoaded", function () {

  initScroll();
  initForms();
  initObjectsCounter();
  initGallerySlider();
  initQuiz();
  initModals();
  initGalleryShowMore();
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(TextPlugin);
  initAnimations();

  function initScroll() {
    var scroll = new SmoothScroll('a[href*="#"]', {
      ignore: '[data-modal-open]',
      speed: 500,
      speedAsDuration: true
    });
  }
  
  function initModals() {
    const modals = new SimpleModal();
    modals.init();
  }

  function initForms() {

    if (!document.querySelector('.form')) return;

    const rulesWrite = [
      {
        ruleSelector: ".form__input--name",
        rules: [
          {
            rule: "required",
            value: true,
            errorMessage: "Введите имя!",
          },
        ],
      },
      {
        ruleSelector: '.form__input--email',
        rules: [
          {
            rule: 'required',
            value: true,
            errorMessage: 'Заполните Email!'
          },
          {
            rule: 'email',
            value: true,
            errorMessage: 'Введите корректный Email!'
          }
        ]
      },
      {
        ruleSelector: '.form__terms input',
        rules: [
          {
            rule: 'required',
            value: true,
            errorMessage: 'Подтвердите своё согласие с политикой!'
          },
        ]
      }
    ]

    const rulesConsult = [
      {
        ruleSelector: ".form__input--name",
        rules: [
          {
            rule: "required",
            value: true,
            errorMessage: "Введите имя!",
          },
        ],
      },
      {
        ruleSelector: '.form__input--tel',
        rules: [
          {
            rule: 'function',
            validator: function (value) {
              return /^[0-9-+()]*$/.test(value) && value.length > 5
            },
            errorMessage: 'Введите корректный номер телефона!',
          },
          {
            rule: 'required',
            value: true,
            errorMessage: 'Заполните телефон!'
          },
        ]
      },
      {
        ruleSelector: '.form__terms input',
        rules: [
          {
            rule: 'required',
            value: true,
            errorMessage: 'Подтвердите своё согласие с политикой!'
          },
        ]
      }
    ]

    const rulesOnline = [
      {
        ruleSelector: ".form__input--name",
        rules: [
          {
            rule: "required",
            value: true,
            errorMessage: "Введите имя!",
          },
        ],
      },
      {
        ruleSelector: '.form__input--tel',
        rules: [
          {
            rule: 'required',
            value: true,
            errorMessage: 'Заполните телефон!'
          },
          {
            rule: 'function',
            validator: function (value) {
              return /^[0-9-+()]*$/.test(value) && value.length > 5
            },
            errorMessage: 'Введите корректный номер телефона!',
          },
        ]
      },
      {
        ruleSelector: '.form__terms input',
        rules: [
          {
            rule: 'required',
            value: true,
            errorMessage: 'Подтвердите своё согласие с политикой!'
          },
        ]
      }
    ]

    const rulesTransfer = [
      {
        ruleSelector: ".form__input--name",
        rules: [
          {
            rule: "required",
            value: true,
            errorMessage: "Введите имя!",
          },
        ],
      },
      {
        ruleSelector: '.form__input--tel',
        rules: [
          {
            rule: 'required',
            value: true,
            errorMessage: 'Заполните телефон!'
          },
          {
            rule: 'function',
            validator: function (value) {
              return /^[0-9-+()]*$/.test(value) && value.length > 5
            },
            errorMessage: 'Введите корректный номер телефона!',
          },
        ]
      },
      {
        ruleSelector: '.form__terms input',
        rules: [
          {
            rule: 'required',
            value: true,
            errorMessage: 'Подтвердите своё согласие с политикой!'
          },
        ]
      }
    ]

    const rulesApartments = [
      {
        ruleSelector: ".form__input--name",
        rules: [
          {
            rule: "required",
            value: true,
            errorMessage: "Введите имя!",
          },
        ],
      },
      {
        ruleSelector: '.form__input--tel',
        rules: [
          {
            rule: 'required',
            value: true,
            errorMessage: 'Заполните телефон!'
          },
          {
            rule: 'function',
            validator: function (value) {
              return /^[0-9-+()]*$/.test(value) && value.length > 5
            },
            errorMessage: 'Введите корректный номер телефона!',
          },
        ]
      },
      {
        ruleSelector: '.form__terms input',
        rules: [
          {
            rule: 'required',
            value: true,
            errorMessage: 'Подтвердите своё согласие с политикой!'
          },
        ]
      }
    ]

    validateForms('#modal-write form', rulesWrite);
    validateForms('#modal-consult form', rulesConsult);
    validateForms('#modal-online form', rulesOnline);
    validateForms('#modal-transfer form', rulesTransfer);
    validateForms('#modal-apartments-1 form', rulesApartments);
  }

  function initGalleryShowMore() {
    const buttons = document.querySelectorAll('.form__more');

    buttons?.forEach((el) => {
      el.addEventListener('click', function() {
        el.closest('.form').querySelector('.form__gallery').classList.add('is-active');
      })
    })
  }

  function initObjectsCounter() {
    const objectsBlock = document.querySelector(".help__objects");
    if (!objectsBlock) return;

    const sumNode = objectsBlock.querySelector(".help__objects-value span");
    const weekNode = objectsBlock.querySelector(".help__objects-week span");

    let sum = +sumNode.dataset.startValue;
    sumNode.textContent = sum;

    const startDate = new Date(sumNode.dataset.startCounter);
    const currentDate = new Date();
    const passedWeeks = +dateDiff("w", startDate, currentDate);

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
    if (!document.querySelector(".gallery__inner")) return;

    const swiper = new Swiper(".gallery__inner", {
      loop: true,
      slidesPerView: "auto",
      speed: 9000,
      freeMode: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
    });
  }

  function initQuiz() {
    const quiz = document.querySelector(".quiz");

    if (!quiz) return;

    quiz.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-next]");

      if (btn) {
        const nextStep = +btn.dataset.next;

        goToStep(nextStep);
      }
    });

    const rules2 = [
      {
        ruleSelector: ".quiz__input--name",
        rules: [
          {
            rule: "required",
            value: true,
            errorMessage: "Введите имя!",
          },
        ],
      },
    ];

    validateSteps(
      ".quiz__inner",
      rules2,
      '.quiz__step[data-step="2"]',
      false
    );
    validateSteps(".quiz__inner", [], '.quiz__step[data-step="3"]', true);
    validateSteps(".quiz__inner", [],  '.quiz__step[data-step="4"]', true);
    validateSteps(".quiz__inner", [],  '.quiz__step[data-step="5"]', true);

    validateLastStep();

    function validateLastStep() {
      const form = document.querySelector(".quiz__inner");

      const quizError = document.querySelector(".quiz__error");
      const quizPhone = document.querySelector(".quiz__input--tel");
      const quizSubmit = document.querySelector(".quiz__btn--submit");
      const quizEmail = document.querySelector(".quiz__input--email");
      const quizTerms = document.querySelector(".quiz__terms input");
      const inputs = document.querySelectorAll(".quiz__content--final input");
      let isValid = false;

      inputs.forEach((input) => {
        input.addEventListener("input", function (e) {
          const phoneValid = /^[0-9-+()]*$/.test(quizPhone.value) && quizPhone.value.length > 5;
          const emailValid =
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              quizEmail.value
            );

          if ((phoneValid || emailValid) && quizTerms.checked) {
            isValid = true;
            quizError.style.display = '';
            quizSubmit.disabled = false;
          } else {
            isValid = false;
            quizSubmit.disabled = true;
            quizError.style.display = 'block';
          }
        });
      });

      form.addEventListener("submit", sendForm);

      function sendForm(ev) {
        let formData = new FormData(ev.target);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              window.location.href = './';
              if (afterSend) {
                afterSend();
              }
            }
          }
        };

        xhr.open("POST", "mail.php", true);
        xhr.send(formData);

        ev.target.reset();
      }
    }

    function goToStep(step) {
      const activeStep = document.querySelector(".quiz__step.is-active");
      const nextStep = document.querySelector(
        `.quiz__step[data-step="${step}"]`
      );

      activeStep.classList.remove("is-active");
      nextStep.classList.add("is-active");
    }
  }

  function validateSteps(
    selector,
    rules,
    stepNode = selector,
    checkboxes
  ) {
    const form = document?.querySelector(selector);
    const btn = document.querySelector(stepNode + " .quiz__btn");
    const checkboxesSelector = stepNode + " .quiz__content";

    if (!form) {
      console.error("Нет такого селектора!");
      return false;
    }

    const validation = new window.JustValidate(selector, {
      errorLabelStyle: {
        color: "#c30303",
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
        "Выберите хотя-бы один пункт!"
      );
    }

    validation.onValidate((ev) => {
      if (!btn) return;

      if (ev.isValid) {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
    });

  }

  function validateForms(selector, rules, afterSend) {
    const form = document?.querySelector(selector);
    const btn = form?.querySelector('button[type="submit"]');

    if (!form) {
      console.error("Нет такого селектора!");
      return false;
    }

    const validation = new window.JustValidate(selector, {
      validateBeforeSubmitting: true,
      errorsContainer: '.form__errors',
      errorLabelStyle: {
        color: "#c30303",
      },
    });

    for (let item of rules) {
      validation.addField(item.ruleSelector, item.rules);
    }

    validation.onSuccess((ev) => {
      let formData = new FormData(ev.target);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            window.location.href = './';
            if (afterSend) {
              afterSend();
            }
          }
        }
      };

      xhr.open("POST", "mail.php", true);
      xhr.send(formData);

      ev.target.reset();
    });
  }

  function initAnimations() {
    if (ScrollTrigger.isTouch === 1) return;

    const counters = gsap.utils.toArray('.counter');
    
    counters.forEach(box => {
      let textNode = box.querySelector('span');
      const endValue = +textNode.textContent;
      
      let counter = {
        value: 0
      }
      
      gsap.to(counter, {
          value: endValue,
          duration: 1,
          onUpdate: () => {
            textNode.textContent = Math.round(counter.value);
          },
          scrollTrigger: {
            trigger: box,
          }
    }); })

    const titles = gsap.utils.toArray('.title__text');

    titles.forEach((item) => {
      item.dataset.text = item.textContent;
      
      gsap.fromTo(
        item,
        {
          text: ''
        },
        {
          duration: 0.7,
          text: item.dataset.text,
          scrollTrigger: {
            trigger: item,
          },
        }
      );
    }); 

    const subtitles = gsap.utils.toArray('.title__small');
    
    subtitles.forEach((item) => {      
      gsap.from(
        item,
        {
          x: -50,
          opacity: 0,
          duration: 0.6,
          delay: 0.3,
          scrollTrigger: {
            trigger: item,
          },
        },
      );
    }); 

    const citizenItems = gsap.utils.toArray('.citizenship__text p');
    let delayCitizenItems = 0.2;

    for (let i = 0; i < citizenItems.length; i++) {
      delayCitizenItems += 0.2;
      gsap.from(
        citizenItems[i],
        {
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: delayCitizenItems,
          scrollTrigger: {
            trigger: '.citizenship__left',
          },
        },
      );
    }

    gsap.from(
      '.help__box p',
      {
        y: 50,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.help__left',
        },
      },
    );

    animateItemsToY('.transfer__list li', '.transfer__list');
    animateItemsToY('.transfer__text p', '.transfer__text');
    animateItemsToY('.help__box li', '.help__left', 0.1, 0.15);
    animateItemsToY('.about-info__item', '.about-info__list', 0.1, 0.15);
    animateItemsToY('.benefits__item', '.benefits__list', 0.1, 0.15);
    
    
    gsap.from(
      '.team__head',
      {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.team',
        },
      },
    );
    
    
    gsap.from(
      '.team__item:nth-child(1)',
      {
        x: 100,
        opacity: 0,
        delay: 0.6,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.team__list',
        },
      },
    );
    gsap.from(
      '.team__item:nth-child(2)',
      {
        x: 100,
        delay: 0.3,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.team__list',
        },
      },
    );
    gsap.from(
      '.team__item:nth-child(3)',
      {
        x: 100,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.team__list',
        },
      },
    );

    
    gsap.from(
      '.help__text',
      {
        x: -50,
        opacity: 0,
        delay: 1.5,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.help__left',
        },
      },
    );

    
    gsap.from(
      '.help__objects-key',
      {
        x: 70,
        opacity: 0,
        delay: 0.4,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.help__right',
        },
      },
    );

    

    const apartmentsItems = gsap.utils.toArray('.apartments__item');

    for (let i = 0; i < apartmentsItems.length; i++) {
      gsap.from(
        apartmentsItems[i],
        {
          y: 100,
          opacity: 0,
          duration: 0.6,
          onComplete: () => {apartmentsItems[i].style.transform = '';},
          scrollTrigger: {
            trigger: apartmentsItems[i],
          },
        },
      );
    }

    const bottomItems = gsap.utils.toArray('[data-anim-bottom]');
    
    bottomItems.forEach((item) => {      
      let delay = item.dataset.delay ? item.dataset.delay : 0;
      
      gsap.from(
        item,
        {
          y: 100,
          delay: delay,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: item,
          },
        },
      );
    }); 
    
    const topItems = gsap.utils.toArray('[data-anim-top]');
    
    topItems.forEach((item) => {      
      let delay = item.dataset.delay ? item.dataset.delay : 0;

      gsap.from(
        item,
        {
          y: -100,
          opacity: 0,
          delay: delay,
          duration: 1,
          scrollTrigger: {
            trigger: item,
          },
        },
      );
    }); 

    const leftItems = gsap.utils.toArray('[data-anim-left]');
    
    leftItems.forEach((item) => {      
      let delay = item.dataset.delay ? item.dataset.delay : 0;

      gsap.from(
        item,
        {
          x: -100,
          opacity: 0,
          duration: 0.6,
          delay: delay,
          scrollTrigger: {
            trigger: item,
            // start: 'top-=50px center'
          },
        },
      );
    }); 

    const rightItems = gsap.utils.toArray('[data-anim-right]');
    
    rightItems.forEach((item) => {      
      let delay = item.dataset.delay ? item.dataset.delay : 0;

      gsap.from(
        item,
        {
          x: 100,
          opacity: 0,
          delay: delay,
          duration: 0.6,
          scrollTrigger: {
            trigger: item,
            // start: 'top-=50px center'
          },
        },
      );
    }); 

    gsap.from(
      '.online__text',
      {
        y: -50,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: '.online__text',
        },
      },
    );

    gsap.from(
      '.online__btn',
      {
        y: -50,
        opacity: 0,
        duration: 0.6,
        delay: 1,
        scrollTrigger: {
          trigger: '.online__list',
        },
      },
    );

    const dividers = gsap.utils.toArray('.divider');

    dividers.forEach(item => {
      const left = item.querySelector('.divider__left div');
      const center = item.querySelector('.divider__center img');
      const right = item.querySelector('.divider__right div');
      
      gsap.from(
        left,
        {
          x: -50,
          scaleX: 0,
          opacity: 0,
          duration: 0.6,
          transformOrigin: "left",
          scrollTrigger: {
            trigger: item,
          },
        },
      );
      
      gsap.from(
        right,
        {
          x: -50,
          scaleX: 0,
          delay: 0.6,
          opacity: 0,
          duration: 0.6,
          transformOrigin: "right",
          scrollTrigger: {
            trigger: item,
          },
        },
      );

      gsap.from(
        center,
        {
          y: -50,
          delay: 1.2,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: item,
          },
        },
      );
    })

    const onlineItems = gsap.utils.toArray('.online__list li');
    let delayOnlineItems = 0.1;

    for (let i = 0; i < onlineItems.length; i++) {
      delayOnlineItems += 0.2;
      gsap.from(
        onlineItems[i],
        {
          y: -50,
          opacity: 0,
          duration: 0.6,
          delay: delayOnlineItems,
          scrollTrigger: {
            trigger: '.online__list',
          },
        },
      );
    }

    const investItems = gsap.utils.toArray('.invest__col p');
    let delayInvestItems = 0.1;

    for (let i = 0; i < investItems.length; i++) {
      delayInvestItems += 0.2;
      gsap.from(
        investItems[i],
        {
          y: -50,
          opacity: 0,
          duration: 0.6,
          delay: delayInvestItems,
          scrollTrigger: {
            trigger: '.invest__row',
          },
        },
      );
    }

    const freeTitleItems = gsap.utils.toArray('.free__title div');
    let delayFreeTitleItems = 0.1;

    for (let i = 0; i < freeTitleItems.length; i++) {
      delayFreeTitleItems += 0.2;
      gsap.from(
        freeTitleItems[i],
        {
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: delayFreeTitleItems,
          scrollTrigger: {
            trigger: '.free__inner',
          },
        },
      );
    }

    const freeItems = gsap.utils.toArray('.free__list li');
    let delayFreeItems = 0.1;

    for (let i = 0; i < freeItems.length; i++) {
      delayFreeItems += 0.2;
      gsap.from(
        freeItems[i],
        {
          y: 50,
          opacity: 0,
          duration: 0.6,
          delay: delayFreeItems,
          scrollTrigger: {
            trigger: '.free__list',
          },
        },
      );
    }

    gsap.from(
      '.free__box-text',
      {
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: 0.8,
        scrollTrigger: {
          trigger: '.free__list',
        },
      },
    );
    gsap.from(
      '.free__btn-wrapper',
      {
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: 1,
        scrollTrigger: {
          trigger: '.free__list',
        },
      },
    );

    function animateItemsToY(itemsSelector, triggerSelector, delay = 0, delayStep = 0.2) {
      const items = gsap.utils.toArray(itemsSelector);
      let startDelay = delay;
      let stepDelay = delayStep;
  
      for (let i = 0; i < items.length; i++) {
        startDelay += stepDelay;
        gsap.from(
          items[i],
          {
            y: -50,
            opacity: 0,
            duration: 0.6,
            delay: startDelay,
            scrollTrigger: {
              trigger: triggerSelector,
            },
          },
        );
      }
    }

  }
});
