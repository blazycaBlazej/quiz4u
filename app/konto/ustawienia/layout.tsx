'use server'

export default async function EditQuizLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='flex w-full flex-col rounded-[20px] border border-solid border-border-color-light dark:border-border-color-dark'>
			<div className='flex items-center justify-between'>
				<h1 className='mx-[20px] my-[15px] text-[27px]  text-black dark:text-white '>Zmeiń hasło</h1>
			</div>

			<div className='border-b border-solid border-border-color-light dark:border-border-color-dark'></div>
			<div className='p-[15px]'>{children}</div>
		</main>
	)
}
