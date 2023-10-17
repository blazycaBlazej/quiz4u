'use client'
import { IconLoader2 } from '@tabler/icons-react'

export const Loader = (): React.JSX.Element => {
	return (
		<div className='flex w-full justify-center'>
			<span className='animate-spin'>
				<IconLoader2 />
			</span>
		</div>
	)
}
