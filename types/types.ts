export interface NavbarElementProps {
	index?: number
	name?: string
	isNew?: boolean
	isActive?: boolean
	isVisible?: boolean
	icon?: JSX.Element | string
	pathname?: string
	isAdmin?: boolean | null
}
export interface TestimonialProps {
	id: number
	name: string
	text: string
	image: string
}

export interface FormValues {
	login: string
	email: string
	password: string
	confirmPassword: string
	newslatter: boolean
	rules: boolean
}

export interface FormEditQuizValues {
	name: string
	description: string
	isNew: boolean
	isActive: boolean
	randomize1Question: boolean
	randomize20Questions: boolean
	randomizeXQuestions: boolean
	rankedGame: boolean
	showAllQuestions: boolean
	printTest: boolean
	competeWithFriends: boolean
}

export interface QuizDataDeatails {
	id: number
	name: string
	description: string
	pathname: string
	isNew: boolean
	isActive: boolean
	randomize1Question: boolean
	randomize20Questions: boolean
	randomizeXQuestions: boolean
	rankedGame: boolean
	showAllQuestions: boolean
	printTest: boolean
	competeWithFriends: boolean
}

export interface quiz {
	id: number
	question: string
	answerA: string
	answerB: string
	answerC: string
	answerD: string
	correctAnswer: string
	quizID: number
}

export interface quizArray {
	questions: quiz[]
}
