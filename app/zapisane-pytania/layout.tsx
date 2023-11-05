'use server'

export default async function EditQuizLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='flex w-full flex-col'>
			<div className='rounded-[20px] border border-solid border-border-color-light dark:border-border-color-dark'>
				<h1 className='mx-[20px] my-[15px] text-[27px]  text-black dark:text-white '>Zapisane pytania</h1>
			</div>
			<div className='mt-[25px]'>{children}</div>
		</main>
	)
}
