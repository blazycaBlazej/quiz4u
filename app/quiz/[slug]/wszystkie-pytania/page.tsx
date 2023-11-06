import Await from '@/components/Await'
import { Suspense } from 'react'
import Loading from './loading'
import { getQuestionsWithPagination } from '@/lib/getSavedQuestionsWithPagination'
import { AllQuestionsViewerWrapper } from '@/components/sections/AllQuestionsViewerViewer/AllQuestionsViewerWrapper'

const xQuestions = async ({
	params,
	searchParams,
}: {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}) => {
	const quizName = decodeURIComponent(params.slug)

	const currentPage = typeof searchParams['strona'] === 'string' ? +searchParams['strona'] : 1
	const perPage = typeof searchParams['na-stronie'] === 'string' ? +searchParams['na-stronie'] : 10

	const dataPromise = getQuestionsWithPagination(quizName, currentPage, perPage)

	return (
		<div className='w-full'>
			<h3 className='mt-[25px] w-full text-center  text-3xl text-black dark:text-white'>
				Wysztkie pytania w quzie - {quizName}
			</h3>
			<Suspense fallback={<Loading />}>
				<Await promise={dataPromise}>
					{(data) => (
						<AllQuestionsViewerWrapper
							data={data}
							quizName={quizName}
							currentPage={currentPage}
							perPage={perPage}
							type='normal'
						/>
					)}
				</Await>
			</Suspense>
		</div>
	)
}

export default xQuestions
