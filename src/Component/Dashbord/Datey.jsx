

import React, { useState, useEffect } from 'react'

const Datey = () => {
	const [currentDateTime, setCurrentDateTime] = useState(new Date())

	useEffect(() => {
		// Update the current date and time every second
		const intervalId = setInterval(() => {
			setCurrentDateTime(new Date())
		}, 1000)

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId)
	}, []) // Empty dependency array ensures the effect runs only once on mount

	const formattedDateTime = currentDateTime.toLocaleString('en-GB', {

		weekday: 'short',
		day: 'numeric',
		month: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		// hour12: true,

	})

	return (
		<>		<span className='mt-1 text-black'>{formattedDateTime}</span>
		</>

	)
}

export default Datey
