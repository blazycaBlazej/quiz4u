export interface NavbarElementProps {
	index?: number
	name?: string
	isNew?: boolean
	isActive?: boolean
	icon?: JSX.Element | string
	pathname?: string
	shouldDisplayWhenLoggedIn?: boolean
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
