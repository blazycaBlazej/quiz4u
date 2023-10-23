import { IconStarFilled } from '@tabler/icons-react'

interface QuizQuestion {
	question: string
	questionNummber?: number
}

export const QuizQuestion = ({ question, questionNummber }: QuizQuestion) => {
	return (
		<div className='wrapper relative flex justify-start w-full max-w-[600px] text-lg p-[20px] pr-[50px]'>
			{questionNummber ? (
				<>
					{questionNummber}. {question}
				</>
			) : (
				<>{question}</>
			)}

			<span className='absolute top-[20px] right-[20px] cursor-pointer transition-colors hover:text-white'>
				<IconStarFilled width={28} height={28} />
			</span>
		</div>
	)
}
