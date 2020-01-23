/*
const URL_API = 'https://pokeapi.co/api/v2/'
const URL_POKE = 'pokemon/id'

const OPTS = {crossDomain: true}

function elegirPokemon(id){
    const POKEMON = `${URL_API}${URL_POKE.replace('id', id)}`

    new Promise(function(resolve, reject){
        $
        .get(POKEMON, OPTS, function(poke){
            resolve(poke)
        })
    })
    .then(poke => console.log(`Elegiste a ${poke.name}`))
    .catch(() => console.log('Se tuvo un error al elegir al Pokemon'))

}

//elegirPokemon(1)
*/
const $listaPD = document.getElementById('pokemonList')
var ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
//console.log(ids)

async function ShowPokemonAvailable() {
	const URL_API_POKEMON = 'https://pokeapi.co/api/v2/pokemon/id'
	async function getPokemon(id) {	
		const pokemon = await fetch(URL_API_POKEMON.replace('id', id))
		const poke 	  = await pokemon.json()
		//console.log('Lista de Pokemon:', poke)
		$listaPD.innerHTML += await poke.id+'. '+poke.name+'<br />'
	}
	for(id in ids) {
		//console.log(id)
		getPokemon(ids[id])
	}
}
ShowPokemonAvailable()
