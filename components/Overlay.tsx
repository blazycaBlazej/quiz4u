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
			}}>
			{isOverlay && <div className='fixed top-0 left-0 w-full h-full bg-[black] z-[999] '></div>}
		</FlipMove>
	)
}

export default Overlay
