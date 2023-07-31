import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "./Spinner/Spinner"

function OnePokemon() {
	const [pokemon, setPokemon] = useState(null)
	const params = useParams()

	async function fetchOne() {
		try {
			const rawResponse = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${params.pokeName}`
			)
			const data = await rawResponse.json()
			console.log(data)
			setPokemon(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchOne()
	}, [params.pokeName])

	if (!pokemon) {
		return <Spinner />
	}
	return (
		<div style={{ margin: "auto" }}>
			<h2>{pokemon.name}</h2>
			<p>
				{pokemon.types.map((oneType) => {
					return <span id={oneType.type.url}>{oneType.type.name}</span>
				})}
			</p>
			<img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
		</div>
	)
}

export default OnePokemon
