import { MostPopularQuizis } from '@/components'
import { LearnGuide } from '@/components/LearnGuide'
import Image from 'next/image'

export default function Home() {
	return (
		<main className=' max-w-[1200px] w-full mx-auto p-[40px] text-base xl:text-lg'>
			<div className='relative flex justify-between items-center flex-col-reverse gap-[50px] lg:flex-row '>
				<Image src={'/rocket.png'} width={300} height={300} alt='rocket' />
				<div>
					<h1 className=' text-white text-5xl py-5'>Witaj na Quizy4u!</h1>
					<p className='text-[17px] max-w-[650px]'>
						Twoje źródło wiedzy i sukcesu na egzaminach! <br />
						Czy przygotowania do egzaminów sprawiają Ci stres i niepewność?
						<br />
						Szukasz skutecznego sposobu na naukę, który dostosuje się do Twoich potrzeb? <br />
						Poznaj Quiz4u - innowacyjną platformę edukacyjną, która pomoże Ci osiągnąć najlepsze wyniki na egzaminach na
						każdym poziomie nauki.
					</p>
				</div>
			</div>
			<div className='mt-[50px] '>
				<h2 className='text-white text-4xl py-1'> Dlaczego warto wybrać Quizy4U?</h2>
				<div className='flex items-center flex-col gap-[20px] lg:flex-row'>
					<ul className='max-w-[600px]  '>
						<li>
							📚 Różnorodność Quizów: Oferujemy quizy dostosowane do Twojego poziomu nauki. Wybieraj spośród losowania
							pojedynczych pytań, zestawów 40 pytań, czy też twórz własne testy.
						</li>
						<li>
							🏆 Rywalizuj z Przyjaciółmi: Zaproś swoich znajomych i rywalizujcie ze sobą na naszej platformie.
							Motywujcie się nawzajem i rozwijajcie swoją wiedzę w przyjemny sposób.
						</li>
						<li>
							📝 Zapisuj Pytania: Nie musisz martwić się zapominaniem trudnych zagadnień. Zapisuj pytania, na które nie
							znasz odpowiedzi, i wracaj do nich w dogodnym momencie.
						</li>
						<li>
							🌟 Dostosowana Nauka: Nauka na Twoich warunkach. Wybieraj, ile pytań chcesz rozwiązać i dostosowuj naukę
							do swojego planu.
						</li>
					</ul>
					<Image src={'/chart.svg'} width={400} height={400} alt='chart' />
				</div>
			</div>
			<MostPopularQuizis />
			<LearnGuide />
		</main>
	)
}
