import { NewQuizForm } from '@/components'
import { getIsAdminWithRedirect } from '@/lib/getIsAdminWithRedirect'

export default async function NewQuizPage() {
	await getIsAdminWithRedirect()
	return <NewQuizForm />
}
