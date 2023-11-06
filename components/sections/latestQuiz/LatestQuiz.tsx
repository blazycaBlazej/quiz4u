import { IconChevronRight } from '@tabler/icons-react'
import Link from 'next/link'

interface LatestQuizProps {
	questionNumber: number
	numberOfCorrectAnswer: number
	createdAt: Date
	id: number
	quizName: string
}

export const LatestQuiz = ({ questionNumber, numberOfCorrectAnswer, createdAt, id, quizName }: LatestQuizProps) => {
	const testResult = ((numberOfCorrectAnswer / questionNumber) * 100).toFixed(0)
	let emoji = ''
	if (+testResult >= 90) {
		emoji = '💯'
	} else if (+testResult >= 70 && +testResult <= 89) {
		emoji = '👍'
	} else if (+testResult >= 50 && +testResult <= 69) {
		emoji = '😐'
	} else {
		emoji = '👎'
	}

	return (
		<Link href={`/quiz/${quizName}/zapisane-quizy/${id}`}>
			<div className='w-full cursor-pointer rounded-lg bg-box-color-light p-[8px] transition-colors hover:bg-box-color-light/80 dark:bg-box-color-dark dark:hover:bg-box-color-dark/80'>
				<div className='flex items-center justify-between'>
					<span className='text-2xl'>{emoji}</span>
					<div>
						<div className='flex text-lg'>
							<div>
								{numberOfCorrectAnswer}/{questionNumber} pytań - {testResult}%
							</div>
						</div>

						<div className='text-xs'>
							{createdAt.toLocaleDateString()},{' '}
							{createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
						</div>
					</div>

					<IconChevronRight />
				</div>
			</div>
		</Link>
	)
}
