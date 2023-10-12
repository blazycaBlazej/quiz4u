import { LoginForm } from '@/components'
import { getIsLoggedWithRedirect } from '@/lib/getIsLoggedWithRedirect'

export default async function LoginPage() {
	await getIsLoggedWithRedirect()
	return <LoginForm />
}
