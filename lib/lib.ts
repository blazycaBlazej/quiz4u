import confetti from 'canvas-confetti'

export function getCorrectAnswerMessage() {
	const correctMessage = [
		'Brawo! Chyba ktoś tu miał dobrą kawę przed quizem!',
		'Oj, strzelasz lepiej niż Robin Hood!',
		'Ta-daaa! Zgadza się, dajesz czadu!',
		'O kurczę, właśnie trafiłeś w dziesiątkę!',
		'Eureka! Ktoś tu jest na fali!',
		'A no widzisz! Czasem warto posłuchać nauczyciela na lekcji!',
		'Wow, ktoś tu chyba zjadał szpinak przed quizem!',
		'Bingo! Chyba masz supermoce, prawda?',
	]
	const randomIndex = Math.floor(Math.random() * correctMessage.length)

	return correctMessage[randomIndex]
}
export function getIncorrectAnswerMessage() {
	const incorrectMessage = [
		'Ups! Ktoś tu chyba zgubił kompas wiedzy',
		'Ej, może chcesz spróbować jeszcze raz? Bez szpiegów z Internetu!',
		'Chyba Ci się przewróciło w głowie... ale nic się nie martw, spróbuj jeszcze raz!',
		'Hmmm... pewnie zgadłeś na chybił-trafił, prawda?',
		'Brawo za odwagę! Niestety, to nie ta odpowiedź.',
		'Ups! Ktoś tu chyba potrzebuje więcej kawy!',
		'Hmmm... pewnie chciałeś kliknąć inny przycisk, prawda?',
		'Brawo za próbę! Ale niestety, to nie ta odpowiedź.',
	]
	const randomIndex = Math.floor(Math.random() * incorrectMessage.length)

	return incorrectMessage[randomIndex]
}

export function bigConfetti() {
	var duration = 3 * 1000
	var animationEnd = Date.now() + duration
	var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

	function randomInRange(min, max) {
		return Math.random() * (max - min) + min
	}

	var interval = setInterval(function () {
		var timeLeft = animationEnd - Date.now()

		if (timeLeft <= 0) {
			return clearInterval(interval)
		}

		var particleCount = 50 * (timeLeft / duration)
		confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
		confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
	}, 250)
}
