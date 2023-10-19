'use client'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function Test() {
	const { data, error, isLoading } = useSWR('/api/getQuestions?quizName=asafs', fetcher)

	if (error) return <div>failed to load</div>
	if (isLoading) return <div>loading...</div>
	if (data)
		return (
			<div>
				{data.data.map((element: any) => (
					<span>{element.question}</span>
				))}
			</div>
		)
}
