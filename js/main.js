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

  initObjectsCounter();
});
