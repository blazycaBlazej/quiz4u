'use server'

import { getIsAdmin } from '@/lib/getIsAdmin'
import { IconPencil } from '@tabler/icons-react'
import Link from 'next/link'

export default async function EditQuizLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: { slug: string }
}) {
	const quizName = decodeURIComponent(params.slug)
	const isAdmin = await getIsAdmin()

	return (
		<main className='flex flex-col w-full rounded-[20px] border border-solid border-border-color'>
			<div className='flex justify-between items-center'>
				<h1 className='text-[27px] text-white mx-[20px] my-[15px] '>Quiz: {quizName}</h1>
				{isAdmin && (
					<div className='mr-[33px]'>
						<Link href={`/edytuj-quiz/${quizName}/detale`}>
							<span className='block  cursor-pointer text-white transition-colors hover:text-main-font-color'>
								<IconPencil width='40' height='40' />
							</span>
						</Link>
					</div>
				)}
			</div>

			<div className='border-b border-solid border-border-color '></div>
			<div className='px-[15px]'>{children}</div>
		</main>
	)
}
