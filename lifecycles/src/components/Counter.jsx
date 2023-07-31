import { useState, useEffect } from "react"

function Counter() {
	const [counter, setCounter] = useState(0)
	const [name, setName] = useState("flo")
	/**
	 * Use effect structure :
	 * useEffect(callback, arrayOfDeps)
	 */
	useEffect(() => {}, [])

	// useEffect(() => {
	// 	//This is going to run every single time because we have
	// 	// no array of dependencies
	// 	console.log("Hello from Coutner")
	// })

	useEffect(() => {
		let intervalId = setInterval(() => {
			console.log("We are running the interval...")
			setCounter((prevCount) => prevCount + 1)
		}, 1000)
		console.log(
			"This console.log is happening only one, when the component is mounted"
		)
		return () => {
			console.log("Clearing interval...")
			clearInterval(intervalId)
		}
	}, [])

	useEffect(() => {
		console.log(`Current counter value: ${counter}`)
	}, [counter])

	useEffect(() => {
		console.log(name)
	}, [name, counter])

	/**
	 * Component is Mounted (born)
	 * Component can be updated (life)
	 * Component can be unmounted (death)
	 */

	useEffect(() => {
		return () => {
			console.log("Component has been removed from the DOM")
		}
	}, [])

	/**
	 * This is the devil
	 */
	// setInterval(() => {
	// 	setCounter((prevCount) => prevCount + 1)
	// }, 1000)

	return (
		<div>
			{/* <p onMouseEnter={() => setName(name + "!")}>{name}</p> */}
			<h2>{counter}</h2>
			{/* <button onClick={() => setCounter(counter + 1)}>Increment</button> */}
			{/* <button onClick={() => setCounter(counter - 1)}>Decrement</button> */}
		</div>
	)
}

export default Counter
