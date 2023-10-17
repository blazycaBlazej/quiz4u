'use server'
import { getQuizDeatails } from '@/lib/getQuizDeatails'
import { EditQuizForm } from '@/components/EditQuizForm'
import { getIsAdminWithRedirect } from '@/lib/getIsAdminWithRedirect'
import { QuizDeatailsHeader } from '@/components/QuizDeatailsHeader'

export default async function EditQuizPage({ params }: { params: { slug: string } }) {
	await getIsAdminWithRedirect()
	const quizName = decodeURIComponent(params.slug)
	const quizDeatails = await getQuizDeatails(quizName)

	return (
		<main className='flex flex-col w-full rounded-[20px] border border-solid border-border-color'>
			<QuizDeatailsHeader quizName={quizName} />
			<div className='border-b border-solid border-border-color '></div>
			<EditQuizForm quizDeatails={quizDeatails} />
			<div className='border-b border-solid border-border-color'></div>
			<div className='w-full flex flex-col items-center'>
				<button
					className={`h-[50px] max-w-[410px] w-full mt-[20px] bg-btn-violet-color  rounded-[20px] text-white cursor-pointer ${
						true ? 'bg-gray-600 hover:cursor-not-allowed hover:bg-gray-600' : ''
					} transition-colors hover:bg-btn-violet-color-hover`}>
					Pokaż pytania
				</button>

				<div className='my-[20px]' style={{ width: 'calc(100% - 30px)' }}>
					<table className='min-w-full m-auto py-2 text-left'>
						<thead className='font-bold text-white'>
							<tr>
								<th>#</th>
								<th>Pytanie</th>
								<th>Odpowiedź A</th>
								<th>Odpowiedź B</th>
								<th>Odpowiedź C</th>
								<th>Odpowiedź D</th>
								<th>Prawidłowa odpowiedź</th>
							</tr>
						</thead>
						<tbody className=''>
							<tr>
								<td>1</td>
								<td>Anna</td>
								<td>Kowalska</td>
								<td>anna.kowalska@example.com</td>
								<td>28</td>
								<td>28</td>
								<td>28</td>
							</tr>
							<tr className=' bg-element-backgorund'>
								<td>1</td>
								<td className='py-[5px]'>Anna</td>
								<td className='py-[5px]'>Kowalska</td>
								<td className='py-[5px]'>anna.kowalska@example.com</td>
								<td className='py-[5px]'>28</td>
								<td className='py-[5px]'>28</td>
								<td className='py-[5px]'>28</td>
							</tr>
							<tr className=''>
								<td className='py-[5px]'>1</td>
								<td className='py-[5px]'>Anna</td>
								<td className='py-[5px]'>Kowalska</td>
								<td className='py-[5px]'>anna.kowalska@example.com</td>
								<td className='py-[5px]'>28</td>
								<td className='py-[5px]'>28</td>
								<td className='py-[5px]'>28</td>
							</tr>
							<tr className=' bg-element-backgorund'>
								<td className='py-[5px]'>1</td>
								<td className='py-[5px]'>Anna</td>
								<td className='py-[5px]'>Kowalska</td>
								<td className='py-[5px]'>anna.kowalska@example.com</td>
								<td className='py-[5px]'>28</td>
								<td className='py-[5px]'>28</td>
								<td className='py-[5px]'>28</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</main>
	)
}
