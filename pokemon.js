class Pokemon {
	constructor(id, name, type, attacks, level, vida, imgFront, imgBack) {
		this.id 	  = id
		this.name 	  = name
		this.type 	  = type
		this.attacks  = attacks
		this.level 	  = level
		this.vida	  = vida
		this.imgFront = imgFront
		this.imgBack  = imgBack
	}
	//de manera aleatoria el ataque lanzará un msj y ejecutará la animación de acuerdo al valor 'true' evaluado en pokeAtack()
	atacar(atacante, atacado, attack) { 
		var random = Math.ceil(Math.random()*10)

		switch(random) {
			case 1:
			case 2:
				$txtBattle.innerHTML = `<strong>${atacante.name}</strong> atacó con ${attack.target.value} pero <strong>${atacado.name}</strong> usó defensa especial`
				useDefense = true
				break
			case 3:
			case 4:
			case 5:
			case 6:
				$txtBattle.innerHTML = `<strong>${atacante.name}</strong> usó ${attack.target.value}`
				pokeAtacado = true
				break
			case 7:
			case 8:
			case 9:
				$txtBattle.innerHTML = `<strong>${atacante.name}</strong> ha atacado con ${attack.target.value}`	
				pokeAtacado = true
				break
			case 10:
				$txtBattle.innerHTML = `<strong>${atacado.name}</strong> evadio el ataque ${attack.target.value} de <strong>${atacante.name}</strong>`
				evadAtaque = true
				break
		}
	}
	//animación para el pokemon que lanza el ataque
	movimientoAtacar($imgPokemon, {type}) {
		if (type == 'Agua') {
			$imgPokemon.classList.add('lanzarAtaqueAgua')
			setTimeout(() => $imgPokemon.classList.remove('lanzarAtaqueAgua'), 1000)	
		}
		else if (type == 'Veneno') {
			$imgPokemon.classList.add('lanzarAtaqueVeneno')
			setTimeout(() => $imgPokemon.classList.remove('lanzarAtaqueVeneno'), 1000)
		}
		else if (type == 'Fantasma') {
			$imgPokemon.classList.add('lanzarAtaqueFantasma')
			setTimeout(() => $imgPokemon.classList.remove('lanzarAtaqueFantasma'), 1000)
		}
		else if ((type == 'Tierra') || (type == 'Lucha') || (type == 'Fuego')) {
			$imgPokemon.classList.add('lanzarAtaqueTierra')
			setTimeout(() => $imgPokemon.classList.remove('lanzarAtaqueTierra'), 1000)
		}
		else if ((type == 'Volador') || (type == 'Psíquico')) {
			$imgPokemon.classList.add('lanzarAtaqueVolador')
			setTimeout(() => $imgPokemon.classList.remove('lanzarAtaqueVolador'), 1000)
		}
		else {
			$imgPokemon.classList.add('lanzarAtaque')
			setTimeout(() => $imgPokemon.classList.remove('lanzarAtaque'), 1000)
		}
	}
	//animación para evadir ataque
	evadirAtaque($imgPokemon) { 
		$imgPokemon.classList.add('evadAtaque')
		setTimeout(() => $imgPokemon.classList.remove('evadAtaque'), 1000)
	}
	//animación para usar defensa especial
	defensaEspecial($imgPokemon) { 
		$imgPokemon.classList.add('useDefense')
		setTimeout(() => $imgPokemon.classList.remove('useDefense'), 1000)
	}
	//animación para el pokemon que recibe el ataque
	atacado($imgPokemon) { 
		$imgPokemon.classList.add('pokeAtacado')
		setTimeout(() => $imgPokemon.classList.remove('pokeAtacado'), 1000)
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
var evadAtaque = false
var pokeAtacado = false
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