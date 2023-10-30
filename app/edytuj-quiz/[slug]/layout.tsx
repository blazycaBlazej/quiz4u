'use client'
import { QuizDeatailsHeader } from '@/components/QuizDeatailsHeader'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function EditQuizLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
	const quizName = decodeURIComponent(params.slug)
	const pathname = usePathname()
	return (
		<main className='flex flex-col w-full rounded-[20px] border border-solid border-border-color'>
			<QuizDeatailsHeader quizName={quizName} />
			<div className='border-b border-solid border-border-color '></div>
			<menu className='flex  flex-col sm:flex-row sm:items-center'>
				<Link href={`/edytuj-quiz/${quizName}/detale`}>
					<li
						className={`p-[24px] text-lg ${
							decodeURIComponent(pathname) === `/edytuj-quiz/${quizName}/detale`
								? 'text-white underline underline-offset-[31px]'
								: ''
						}`}>
						Detale
					</li>
				</Link>
				<Link href={`/edytuj-quiz/${quizName}/dodaj-pytanie`}>
					<li
						className={`p-[24px] text-lg ${
							decodeURIComponent(pathname) === `/edytuj-quiz/${quizName}/dodaj-pytanie`
								? 'text-white underline underline-offset-[31px]'
								: ''
						}`}>
						Dodaje pytanie
					</li>
				</Link>
				<Link href={`/edytuj-quiz/${quizName}/zarzadzaj-pytaniami`}>
					<li
						className={`p-[24px] text-lg ${
							decodeURIComponent(pathname) === `/edytuj-quiz/${quizName}/zarzadzaj-pytaniami`
								? 'text-white underline underline-offset-[31px]'
								: ''
						}`}>
						Zarządzaj pytaniami
					</li>
				</Link>
			</menu>

			<div className='border-b border-solid border-border-color '></div>
			{children}
		</main>
	)
}
