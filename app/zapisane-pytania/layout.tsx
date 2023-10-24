'use server'

import { getIsAdmin } from '@/lib/getIsAdmin'
import { IconPencil } from '@tabler/icons-react'
import Link from 'next/link'

export default async function EditQuizLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='flex flex-col w-full'>
			<div className='rounded-[20px] border border-solid border-border-color'>
				<h1 className='text-[27px] text-white mx-[20px] my-[15px] '>Zapisane pytania</h1>
			</div>
			<div className='mt-[25px]'>{children}</div>
		</main>
	)
}
