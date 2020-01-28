class Pokemon {
	constructor(id, name, type, level, vida) {
		this.id 	= id
		this.name 	= name
		this.type 	= type
		this.level 	= level
		this.vida 	= vida
	}
}

const $listaPD = document.getElementById('pokemonList')
const TOTAL_POKEMON_DISPONIBLES = 50
var ids = new Array(TOTAL_POKEMON_DISPONIBLES)
var listaPD = []
var pokemonSelected
var pokemonSelected1
var pokemonSelected2

for(let i=0; i<ids.length; i++){
	let j = i+1
	ids[i] = j
}

async function ShowPokemonAvailable() {
	const URL_API_POKEMON = 'https://pokeapi.co/api/v2/pokemon/id'
	async function getPokemon(id) {	
		const pokemon = await fetch(URL_API_POKEMON.replace('id', id))
		const poke 	  = await pokemon.json()
		if (poke.id != null) {
			$listaPD.innerHTML += poke.id+'. '+poke.name+'<br />'
			listaPD.push(poke)
			return poke
		}
		throw new Error(`No se pudo obtener el Pokemon ${id}`)
	}
	for(id in ids) {
		try {
			await getPokemon(ids[id])
		}catch(error) {
			alert(error)
		}
	}
}