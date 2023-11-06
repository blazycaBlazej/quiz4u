'use server'

import { ChangePasswordForm } from '@/components/form/ChangePasswordForm'

export default async function ChangePasswordPage() {
	return (
		<main className='text-base xl:text-lg'>
			<ChangePasswordForm />
		</main>
	)
}
