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

		switch(random) {
			case 1:
				$txtBattle.innerHTML = `<strong>${obj1.name}</strong> atacó con ${attack.target.value} pero pokemon2 usó defensa especial`
				break
			case 2:
			case 3:
			case 4:
			case 5:
				$txtBattle.innerHTML = `<strong>${obj1.name}</strong> usó ${attack.target.value}`
				break
			case 6:
			case 7:
			case 8:
			case 9:
				$txtBattle.innerHTML = `<strong>${obj1.name}</strong> ha atacado con ${attack.target.value}`	
				break
			case 10:
				$txtBattle.innerHTML = `<strong>${obj2.name}</strong> evadio el ataque ${attack.target.value} de <strong>${obj1.name}</strong>`
				useDefense = true
				break
		}
	}
	evadirAtaque($imgDefense) {
		$imgDefense.classList.toggle('imgEnd')
		setTimeout(() => $imgDefense.classList.toggle('imgEnd'), 100)
		setTimeout(() => $imgDefense.classList.toggle('imgEnd'), 200)
		setTimeout(() => $imgDefense.classList.toggle('imgEnd'), 300)
	}
}

const TOTAL_POKEMON_DISPONIBLES = 150
const $listaPD   = document.getElementById('pokemonList')
const $txtBattle = document.getElementById('battle-text')
var ids = new Array(TOTAL_POKEMON_DISPONIBLES)
var listaPD = []
var movesPokemon = []
var typeEsp
var useDefense = false
var pokemonSelected
var pokemonSelected1
var pokemonSelected2

for(let i=0; i<ids.length; i++){
	let j  = i+1
	ids[i] = j
}

async function loadPokemonAvailable() {
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

async function getAtaqueEs(url) {
	const ataquePokemonUrl  = await fetch(url)
	const ataquePokemonJSON = await ataquePokemonUrl.json()
	return ataquePokemonJSON
}

function getMovesPokemon($pokemon) {
	movesPokemon = new Array(0)

	$pokemon.moves.slice(0, 3).map(async function(z){
		const ataquePokemon = await getAtaqueEs(z.move.url)
		const ataqueEsp     = await ataquePokemon.names[4].name
		movesPokemon.push({name: ataqueEsp})
	})
	//console.log(movesPokemon)
}

async function getTypeEsp($pokemon) {
	const url = $pokemon.types[0].type.url

	const typesUrl   = await fetch(url)
	const typesJSON  = await typesUrl.json()
	typeEsp 		 = typesJSON.names[4].name
	//console.log(typeEsp)
}