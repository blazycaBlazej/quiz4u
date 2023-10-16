export default function QuizPage({ params }: { params: { slug: string } }) {
	const correctQuizName = (inputString: string) => {
		return inputString.replace('%20', ' ')
	}

	const quizName = correctQuizName(params.slug)
	//min-h-[calc(100vh-130px)]
	return (
		<main className='flex flex-col w-full  rounded-[20px] border border-solid border-border-color'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl text-white m-[33px] '>Quiz: {quizName}</h1>
				<div className=' mr-[33px]'>
					<span className='text-white'>Panel administratora:</span>
					<ul>
						<li>Zarządzanie bazą pytań</li>
						<li>Zarządzanie quizem</li>
					</ul>
				</div>
			</div>
			<div className='border-b border-solid border-border-color'></div>
			<div className='cointiner flex flex-col  m-[33px]'>
				<p className='my-[20px]'>
					Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
					literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
					College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
					and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem
					Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
					Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
					Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
					1.10.32.
				</p>
				<div className='flex justify-between'>
					<div className=''>
						<h2 className='text-white text-2xl'>Dostępn opcje nauki:</h2>
						<ul>
							<li>Losuj 1 pytanie</li>
							<li>Losuj 40 pytań</li>
							<li>Losuj 40 pytań - gra rankingowa</li>
							<li>Losuj x pytań</li>
							<li>Pokaż wszystkie pytania</li>
							<li>Drukuj test z losowymi pytaniami</li>
							<li>Rywalizuj ze znajomymi</li>
						</ul>
					</div>
					<div className=''>
						<span className='text-white text-2xl'>Twoje ostatnie testy:</span>
					</div>
				</div>
				<span className='text-white text-2xl mt-[20px]'>Komentarze: </span>
			</div>
		</main>
	)
}
