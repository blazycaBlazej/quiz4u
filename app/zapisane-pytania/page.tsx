import SavedQuestionsCard from '@/components/sections/SavedQuestionsCard'
import { getSavedQuestionsSummary } from '@/lib/getSavedQuestionsSummary'

export default async function SavedQuestionsPage() {
	const savedQuestionsSummary = await getSavedQuestionsSummary()

	if (!savedQuestionsSummary) return <div>Error</div>
	if (Object.keys(savedQuestionsSummary).length === 0) return <div>Nie masz zapisanych pytań.</div>

	return (
		<div className='flex flex-col gap-3'>
			{Object.entries(savedQuestionsSummary).map(([key, value]) => {
				return <SavedQuestionsCard key={key} quizName={key} numberQuestions={value} />
			})}
		</div>
	)
}
