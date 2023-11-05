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
		<main className='flex w-full flex-col rounded-[20px] border border-solid border-border-color-light dark:border-border-color-dark'>
			<div className='flex items-center justify-between'>
				<h1 className='mx-[20px] my-[15px] text-[27px]  text-black dark:text-white '>Quiz: {quizName}</h1>
				{isAdmin && (
					<div className='mr-[33px]'>
						<Link href={`/edytuj-quiz/${quizName}/detale`}>
							<span className='block  cursor-pointer text-black transition-colors hover:text-light-text dark:text-white dark:hover:text-dark-text'>
								<IconPencil width='40' height='40' />
							</span>
						</Link>
					</div>
				)}
			</div>

			<div className='border-b border-solid border-border-color-light dark:border-border-color-dark'></div>
			<div className='px-[15px]'>{children}</div>
		</main>
	)
}
