// import "./App.css"
import Counter from "./components/Counter"
import { useState, useEffect } from "react"
import { Link, Route, Routes } from "react-router-dom"

import OnePokemon from "./components/OnePokemon"

function App() {
	const [showCounter, setShowCounter] = useState(false)
	const [pokeNames, setPokeNames] = useState([])
	const [apiUrl, setApiUrl] = useState(
		"https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
	)
	const [previousUrl, setPreviousUrl] = useState("")
	const [nextUrl, setNextUrl] = useState("")

	async function fetchPokeNames() {
		try {
			const rawresponse = await fetch(apiUrl)
			const data = await rawresponse.json()
			setPokeNames(data.results)
			setPreviousUrl(data.previous)
			setNextUrl(data.next)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetchPokeNames()
	}, [apiUrl])
	return (
		<>
			<button onClick={() => setShowCounter(!showCounter)}>
				{showCounter ? "Hide" : "Show"} Counter
			</button>
			{showCounter && <Counter />}

			{/* Display a sidebar with a list of pokemons
				They should have a Link which will lead me to /pokemon/theNameOfThePokemon
				Bonus, having next / previous buttons to update the list
			*/}
			<section
				style={{
					display: "flex",
					justifyContent: "space-evenly",
					alignItems: "center",
				}}>
				<div
					style={{
						alignSelf: "flex-start",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						textAlign: "center",
						backgroundColor: "gray",
						width: "10rem",
						padding: "1rem",
						marginRight: "auto",
					}}>
					{pokeNames.map((onePoke) => {
						return (
							<Link
								to={`/pokemon/${onePoke.name}`}
								style={{
									color: "white",
								}}>
								{onePoke.name}
							</Link>
						)
					})}

					{previousUrl && (
						<button
							onClick={() => {
								setApiUrl(previousUrl)
							}}>
							Previous
						</button>
					)}
					{nextUrl && (
						<button
							onClick={() => {
								setApiUrl(nextUrl)
							}}>
							Next
						</button>
					)}
				</div>

				{/* 
				Have a OnePokemon Component rendered when the url of my app
				is /pokemon/:name
				This component should render some of the pokemons info
			*/}
				<Routes>
					<Route path="/pokemon/:pokeName" element={<OnePokemon />} />
				</Routes>
			</section>
		</>
	)
}

export default App
