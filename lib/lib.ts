import confetti from 'canvas-confetti'
import { ClassValue, clsx } from 'clsx'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'
import { hash, compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'

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

	function randomInRange(min: number, max: number) {
		return Math.random() * (max - min) + min
	}

	var interval: NodeJS.Timeout = setInterval(function () {
		var timeLeft = animationEnd - Date.now()

		if (timeLeft <= 0) {
			return clearInterval(interval)
		}

		var particleCount = 50 * (timeLeft / duration)
		confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
		confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
	}, 250)
}

export function notification(type: string, message: string) {
	if (type === 'success') {
		toast.success(message, {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		})
	}
	if (type === 'error') {
		toast.error(message, {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		})
	}
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export async function hashPassword(password: string): Promise<string> {
	const heshedPassword = await hash(password, 12)
	return heshedPassword
}

export async function verifyPassword(password: string, heshedPassword: string) {
	const isValid = await compare(password, heshedPassword)
	return isValid
}

export function genereteJSWT(id: string) {
	if (process.env.JWT_SECRET) {
		const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '1m' })
		return token
	}
	return null
}
