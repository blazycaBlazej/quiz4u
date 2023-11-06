'use client'

import { useMenu } from '@/app/context/MenuProvider'
import React from 'react'
import FlipMove from 'react-flip-move'

const Overlay = () => {
	const { isOverlay } = useMenu()

	return (
		<FlipMove
			duration={300}
			easing='linear'
			enterAnimation={{
				from: { opacity: '0' },
				to: { opacity: '0.8' },
			}}
			leaveAnimation={{
				from: { opacity: '0.8' },
				to: { opacity: '0' },
			}}
		>
			{isOverlay && <div className='fixed left-0 top-0 z-[999] h-full w-full bg-[black] '></div>}
		</FlipMove>
	)
}

export default Overlay
