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

elegirPokemon(1)