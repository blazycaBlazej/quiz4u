import NewQuizForm from '@/components/form/NewQuizForm'
import { getIsAdminWithRedirect } from '@/lib/getIsAdminWithRedirect'

// import dynamic from 'next/dynamic'
// const NewQuizForm = dynamic(() => import('@/components/form/NewQuizForm'), { loading: () => <p>loading</p> })

export default async function NewQuizPage() {
	await getIsAdminWithRedirect()
	return <NewQuizForm />
}
