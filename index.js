const $start 			= document.getElementById('btnStart')
const $turno 			= document.getElementById('turno')
const $instructions 	= document.getElementById('container-start')
const $imgCharging 		= document.getElementById('charging')
const $footer 			= document.getElementById('footer')
const $chosePlayerName  = document.getElementById('container-choose-playerName')
const $p1 				= document.getElementById('p1')
const $p2 				= document.getElementById('p2')
const $btnPlayer 		= document.getElementById('btnPlayerName')
const $txtPlayer 		= document.getElementById('txtPlayerName')
const $formName			= document.getElementById('formName')
const $playerName1 		= document.getElementById('namePlayer1')
const $playerName2 		= document.getElementById('namePlayer2')
const $pokeGif   		= document.getElementById('gifpokemon')
const $chosePokemon 	= document.getElementById('container-choose-pokemon')
const $txtPokemonID		= document.getElementById('txtPokemonSelected')
const $btnPokemon		= document.getElementById('btnPokemonName')
const $formID			= document.getElementById('formID')
const $timer			= document.getElementById('container-timer')
const $infoBattle 		= document.getElementById('container-pokemonInfo-battle')
const $pName1 			= document.getElementById('pokemonName1')
const $pType1			= document.getElementById('pokemonType1')
const $pLevel			= document.getElementById('pokemonLevel1')
const $pLife1			= document.getElementById('pokemonLife1')
const $pName2 			= document.getElementById('pokemonName2')
const $pType2			= document.getElementById('pokemonType2')
const $pLeve2			= document.getElementById('pokemonLevel2')
const $pLife2			= document.getElementById('pokemonLife2')
const $battleMap		= document.getElementById('battleMapID')
const $battleButtons1	= document.getElementById('battleButtons1')
const $battleButtons2	= document.getElementById('battleButtons2')
const $imgPoke1			= document.getElementById('imgPoke1')
const $imgPoke2			= document.getElementById('imgPoke2')
const $ataque1a 		= document.getElementById('ataque1a')
const $ataque2a			= document.getElementById('ataque2a')
const $ataque3a			= document.getElementById('ataque3a')
const $ataque1b 		= document.getElementById('ataque1b')
const $ataque2b			= document.getElementById('ataque2b')
const $ataque3b			= document.getElementById('ataque3b')
const $playAgain		= document.getElementById('playAgain')

var namePlayer1, namePlayer2
var turno = 1
var combate = 1

$start.addEventListener('click', empezar)
$btnPlayer.addEventListener('click', playerName)
$btnPokemon.addEventListener('click', selecPokemon)
$playAgain.addEventListener('click', playAgain)
$formName.addEventListener('submit', (ev) => {
	ev.preventDefault()
	playerName()
})
$formID.addEventListener('submit', (ev) => {
	ev.preventDefault()
	selecPokemon()
})

function showInstructions() {
	setTimeout(()=> {
		$imgCharging.classList.toggle('hide')
		$instructions.classList.toggle('start')
	}, 2000)
}
function empezar(){
	loadPokemonAvailable()
	$instructions.classList.toggle('start')
	$turno.classList.toggle('turno')
	$chosePlayerName.classList.toggle('choosePlayerName')
	setTimeout(() => $p1.classList.toggle('indicator'), 500)
}
function playAgain() {	
	turno = 1
	combate ++
	$txtBattle.innerHTML = 'Comienza la batalla, mira el indicador sobre el nombre del player para saber de quien es el turno'
	$imgPoke1.classList.remove('pokeByeBye')
	$imgPoke2.classList.remove('pokeByeBye')
	$imgPoke1.classList.remove('imgEnd')
	$imgPoke2.classList.remove('imgEnd')
	$battleButtons1.classList.remove('turnButtons')
	$battleButtons2.classList.remove('turnButtons')
	$imgPoke1.classList.remove('rotar')
	$imgPoke2.classList.remove('rotar')
	$battleMap.classList.remove('map2')
	imgTurnPokemon1()
	$chosePokemon.classList.toggle('containerChoosePokemon')
	$infoBattle.classList.toggle('pokemonInfoBattle')
	$playAgain.classList.toggle('hide')
	$txtPokemonID.value = ''
	$p2.classList.remove('indicator')
	setTimeout(() => $p1.classList.add('indicator'), 2000)
}
function playerName() {
	switch(turno) {
		case 1:
			if ($txtPlayer.value == '') {
				//alert(`Player ${turno}, debes ingresar un nombre de usuario`)
				swal('Elije tu nombre de maestro Pokemon', `Player ${turno}, debes ingresar un nombre de usuario`, 'warning')
			}else{
				namePlayer1 = $txtPlayer.value
				$playerName1.innerHTML = namePlayer1
				$txtPlayer.value = ''
				turno++
				$p1.classList.toggle('indicator')
				$p2.classList.toggle('indicator')
			}
		break
		case 2:
			if ($txtPlayer.value == '') {
				//alert(`Player ${turno}, debes ingresar un nombre de usuario`)
				swal('Elije tu nombre de maestro Pokemon', `Player ${turno}, debes ingresar un nombre de usuario`, 'warning')

			}else{
				namePlayer2 = $txtPlayer.value
				$playerName2.innerHTML = namePlayer2
				turno--
				setTimeout(() => {
					$p2.classList.toggle('indicator')
					$chosePlayerName.classList.toggle('choosePlayerName')
					$chosePokemon.classList.toggle('containerChoosePokemon')
				}, 400)
				setTimeout(() => {
					$pokeGif.classList.toggle('hide')
					$listaPD.classList.toggle('hide')
					$p1.classList.toggle('indicator')
				}, 5000)
			}
		break
	}
}
function setImgAttributes($element, attributes) {
	for(let attribute in attributes)
		$element.setAttribute(attribute, attributes[attribute])
}
function loadPokemonInfo() {
	$pName1.innerHTML = pokemonSelected1.name
	$pType1.innerHTML = pokemonSelected1.type
	$pLevel.innerHTML = pokemonSelected1.level
	$pLife1.innerHTML = pokemonSelected1.vida

	$pName2.innerHTML = pokemonSelected2.name
	$pType2.innerHTML = pokemonSelected2.type
	$pLeve2.innerHTML = pokemonSelected2.level
	$pLife2.innerHTML = pokemonSelected2.vida
}
async function makePokemon(n) {
	const poke = listaPD[n-1]

	await getTypeEsp(poke) //obtiene typeEsp
	await getMovesPokemon(poke) //obtiene movesPokemon
	pokemonSelected = new Pokemon(poke.id, poke.name, typeEsp, movesPokemon, poke.base_experience, 100, poke.sprites.front_default, poke.sprites.back_default)

	switch(turno) {
		case 1:
			pokemonSelected1 = pokemonSelected
			//console.log('pokemonSelected1', pokemonSelected1)
			turno++
			$txtPokemonID.value = ''
			$p1.classList.toggle('indicator')
			$p2.classList.toggle('indicator')
			await swal('Tu equipo:', `${namePlayer1}, Elejiste a ${pokemonSelected1.name}`, 'success')
		break
		case 2:
			pokemonSelected2 = pokemonSelected
			//console.log('pokemonSelected2', pokemonSelected2)
			turno--
			$p2.classList.toggle('indicator')
			await swal('Tu equipo:', `${namePlayer2}, Elejiste a ${pokemonSelected2.name}`, 'success')
			$chosePokemon.classList.toggle('containerChoosePokemon')
			$timer.classList.toggle('hide')
			loadPokemonInfo()
			imgTurnPokemon1()
			turnButtonsA()
			setTimeout(() => {
				loadAttacks(pokemonSelected1, pokemonSelected2)
				$timer.classList.toggle('hide')
				$infoBattle.classList.toggle('pokemonInfoBattle')
				$p1.classList.toggle('indicator')
				$battleButtons1.classList.toggle('turnButtons')
				$imgPoke1.classList.toggle('imgEnd')
			}, 2000)
		break
	}
}
function selecPokemon() {
	switch(turno) {
		case 1:
			if ($txtPokemonID.value == '') {
				swal('Elije a tu compañero de lucha', `Player ${namePlayer1}, no has ingresado ningún ID`, 'warning')

			}else{
				makePokemon($txtPokemonID.value)
			}
			break
		case 2:
			if ($txtPokemonID.value == '') {
				swal('Elije a tu compañero de lucha', `Player ${namePlayer2}, no has ingresado ningún ID`, 'warning')

			}else{
				makePokemon($txtPokemonID.value)
			}
			break
	}
}
function changeImgPosition() {
	switch(turno) {
		case 1:
			imgTurnPokemon2()
			turnButtonsB()
			$imgPoke1.classList.toggle('rotar')
			$imgPoke2.classList.toggle('rotar')
			turno++
			break
		case 2:
			imgTurnPokemon1()
			turnButtonsA()
			$imgPoke1.classList.toggle('rotar')
			$imgPoke2.classList.toggle('rotar')
			turno--
			break
	}
}
function imgTurnPokemon1() {
	setImgAttributes($imgPoke1, {
		src: `${pokemonSelected1.imgBack}`,
		width: 150,
		height: 150,
	})
	setImgAttributes($imgPoke2, {
		src: `${pokemonSelected2.imgFront}`,
		width: 120,
		height: 120,
	})
}
function imgTurnPokemon2() {
	setImgAttributes($imgPoke1, {
		src: `${pokemonSelected1.imgFront}`,
		width: 120,
		height: 120,
	})
	setImgAttributes($imgPoke2, {
		src: `${pokemonSelected2.imgBack}`,
		width: 150,
		height: 150,
	})
}
function loadAttacks(ps1, ps2) {
	console.log('ps1', ps1)
	console.log('ps2', ps2)
	let a = ps1.attacks
	let b = ps2.attacks
	setImgAttributes($ataque1a, {value: `${a[0].name}`})
	setImgAttributes($ataque2a, {value: `${a[1].name}`})
	setImgAttributes($ataque3a, {value: `${a[2].name}`})

	setImgAttributes($ataque1b, {value: `${b[0].name}`})
	setImgAttributes($ataque2b, {value: `${b[1].name}`})
	setImgAttributes($ataque3b, {value: `${b[2].name}`})
}
async function ganador($img, ganador, user) {
	setImgAttributes($img, {
	src: `${ganador.imgFront}`,
	width: 250,
	height: 250,
	})
	$txtBattle.innerHTML += ' ha sido un golpe letal<br/>Fin de la batalla !!'
	await swal(`Combate ${combate}`, `El ganador del combate fue ${ganador.name} del maestro Pokemon ${user}`, 'success')
}
function perdedor($img, {name}, user) {
	$txtBattle.innerHTML = `Fin de la batalla !!<br /><strong>${name}:</strong> No me quiero ir Sr. ${user}....`
	$img.classList.add('pokeByeBye')
	setTimeout(() => $playAgain.classList.toggle('hide'), 4000)
}
async function validarGanador() {
	if (pokemonSelected1.vida < 1) {
		turnButtonsOf()
		$pLife1.innerHTML = 0
		$p2.classList.toggle('indicator')
		await ganador($imgPoke2, pokemonSelected2, namePlayer2)
		setTimeout(() => perdedor($imgPoke1, pokemonSelected1, namePlayer1), 1100)
	} else if (pokemonSelected2.vida < 1) {
		turnButtonsOf()
		$pLife2.innerHTML = 0
		$p1.classList.toggle('indicator')
	    await ganador($imgPoke1, pokemonSelected1, namePlayer1)
		setTimeout(() => perdedor($imgPoke2, pokemonSelected2, namePlayer2), 1100)
	}else{
		changeImgPosition()
		setTimeout(() => $txtBattle.innerHTML += `<br />La battalla continua...`, 1000)
		$battleButtons1.classList.toggle('turnButtons')
		$battleButtons2.classList.toggle('turnButtons')
		$p1.classList.toggle('indicator')
		$p2.classList.toggle('indicator')
		$battleMap.classList.toggle('map2')
		$imgPoke1.classList.toggle('imgEnd')
		$imgPoke2.classList.toggle('imgEnd')
	}
}
function pokeAtack(attack) {
	var powerAtack
		/*
		pokemonSelected1.attacks[0].name
		pokemonSelected1.attacks[1].name
		pokemonSelected1.attacks[2].name

		pokemonSelected2.attacks[0].name
		pokemonSelected2.attacks[1].name
		pokemonSelected2.attacks[2].name

			if (obj1.level > obj2.level) {
				if ((obj1.level/2)>obj2.level) {
					L = 2
				}else{
					L = 1.5
				}
			}else{
				L = 1
			}

			if (obj1.type == water) {

			}

			var random = Math.random()
			if (random > 4) {
				D = 0
			}else {
				D = 15
			}
			*/
		if (turno === 1) {
			if (pokemonSelected1.level > pokemonSelected2.level) {
				if ((pokemonSelected1.level/2)>pokemonSelected2.level) {
					powerAtack = 50
				}else{
					powerAtack = 30
				}
			}else{
				powerAtack = 15
			}
			pokemonSelected1.atacar(pokemonSelected1, pokemonSelected2, attack)
			pokemonSelected2.vida -= powerAtack
			$pLife2.innerHTML = pokemonSelected2.vida
		}else{
			if (pokemonSelected2.level > pokemonSelected1.level) {
				if ((pokemonSelected2.level/2)>pokemonSelected1.level) {
					powerAtack = 50
				}else{
					powerAtack = 30
				}
			}else{
				powerAtack = 15
			}

			pokemonSelected2.atacar(pokemonSelected2, pokemonSelected1, attack)
			pokemonSelected1.vida -= powerAtack
			$pLife1.innerHTML = pokemonSelected1.vida
		}
		validarGanador()
}
function turnButtonsA() {
	$ataque1a.addEventListener('click', pokeAtack)
	$ataque2a.addEventListener('click', pokeAtack)
	$ataque3a.addEventListener('click', pokeAtack)

	$ataque1b.removeEventListener('click', pokeAtack)
	$ataque2b.removeEventListener('click', pokeAtack)
	$ataque3b.removeEventListener('click', pokeAtack)
}
function turnButtonsB() {
	$ataque1b.addEventListener('click', pokeAtack)
	$ataque2b.addEventListener('click', pokeAtack)
	$ataque3b.addEventListener('click', pokeAtack)

	$ataque1a.removeEventListener('click', pokeAtack)
	$ataque2a.removeEventListener('click', pokeAtack)
	$ataque3a.removeEventListener('click', pokeAtack)
}
function turnButtonsOf() {
	$ataque1b.removeEventListener('click', pokeAtack)
	$ataque2b.removeEventListener('click', pokeAtack)
	$ataque3b.removeEventListener('click', pokeAtack)	

	$ataque1a.removeEventListener('click', pokeAtack)
	$ataque2a.removeEventListener('click', pokeAtack)
	$ataque3a.removeEventListener('click', pokeAtack)
}
showInstructions()