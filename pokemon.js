class Pokemon {
	constructor(id, name, type, attacks, level, vida, imgFront, imgBack) {
		this.id 	  	= id
		this.name 	  = name
		this.type 	  = type
		this.attacks  = attacks
		this.level 	  = level
		this.vida	 	  = vida
		this.imgFront = imgFront
		this.imgBack  = imgBack
	}
	atacar(obj1, obj2, attack) {
		var random = Math.ceil(Math.random()*10)
		console.log(random)
		if (random < 9) {
			if(random < 6){
				if(random < 2){
					$txtBattle.innerHTML = `<strong>${obj1.name}</strong> atacó con ${attack.target.value} pero pokemon2 usó defensa especial`
				}
				$txtBattle.innerHTML = `<strong>${obj1.name}</strong> usó ${attack.target.value}`
			}
			$txtBattle.innerHTML = `<strong>${obj1.name}</strong> ha atacado con ${attack.target.value}`	
		}else{
			$txtBattle.innerHTML = `<strong>${obj2.name}</strong> evadio el ataque ${attack.target.value} de <strong>${obj1.name}</strong>`
		}
	}
}

const $listaPD   = document.getElementById('pokemonList')
const $pokeGif   = document.getElementById('gifpokemon')
const $txtBattle = document.getElementById('battle-text')
const TOTAL_POKEMON_DISPONIBLES = 150
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
		if (id == (TOTAL_POKEMON_DISPONIBLES - 1)) {
			setTimeout(() => {
				$pokeGif.classList.toggle('hide')
				$listaPD.classList.toggle('hide')
			}, 2000)
		}
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
async function getAtaqueEs(url) {
	const ataquePokemonUrl  = await fetch(url)
	const ataquePokemonJSON = await ataquePokemonUrl.json()
	//const ataquePokemon 	= await ataquePokemonJSON.names[4].name
	console.log(ataquePokemonJSON)
	return ataquePokemonJSON
}

var movesPokemon = []
var ataquePokemon
var ataqueEsp

function getMovesPokemon($pokemon){
	movesPokemon = new Array(0)
	$pokemon.moves.slice(0, 3).map(async function(z){
		console.log('imprimir z', z)
		ataquePokemon = await getAtaqueEs(z.move.url)
		ataqueEsp     = await ataquePokemon.names[4].name
		movesPokemon.push({name: ataqueEsp})
	})
	console.log('movesPokemon', movesPokemon)
}