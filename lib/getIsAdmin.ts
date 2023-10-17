import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const getIsAdmin = async () => {
	const session = await getServerSession(authOptions)
	if (session?.user.isAdmin) return true

	return false
}
