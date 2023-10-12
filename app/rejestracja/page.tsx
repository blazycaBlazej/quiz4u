import { RegisterForm } from '@/components'
import { getIsLoggedWithRedirect } from '@/lib/getIsLoggedWithRedirect'

export default async function RegisterPage() {
	await getIsLoggedWithRedirect()
	return <RegisterForm />
}
