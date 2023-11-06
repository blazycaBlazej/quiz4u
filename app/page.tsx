import { MostPopularQuizis, Testimonials } from '@/components'
import { FAQ } from '@/components/sections/FAQ'
import { LearnGuide } from '@/components/sections/LearnGuide'
import Image from 'next/image'

export default function Home() {
	return (
		<main className='text-base xl:text-lg'>
			<div className='relative flex flex-col-reverse items-center justify-between gap-[50px] lg:flex-row '>
				<Image src={'/rocket.png'} width={300} height={300} alt='rocket' />
				<div>
					<h1 className=' py-3 text-5xl text-black dark:text-white'>Witaj na Quizy4u!</h1>
					<p className='max-w-[700px] text-[17px]'>
						Twoje źródło wiedzy i sukcesu na egzaminach! <br />
						Czy przygotowania do egzaminów sprawiają Ci stres i niepewność?
						<br />
						Szukasz skutecznego sposobu na naukę, który dostosuje się do Twoich potrzeb? <br />
						Poznaj Quiz4u - innowacyjną platformę edukacyjną, która pomoże Ci osiągnąć najlepsze wyniki na egzaminach na
						każdym poziomie nauki.
					</p>
				</div>
			</div>
			<div className='m-auto flex w-full max-w-[700px] flex-col pt-3 lg:max-w-full'>
				<h2 className=' pb-3 text-4xl  text-black dark:text-white '> Dlaczego warto wybrać Quizy4U?</h2>
				<div className='flex flex-col items-center justify-between lg:flex-row '>
					<ul className='max-w-[700px]  '>
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
			<Testimonials />
			<FAQ />
		</main>
	)
}
