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
const $playerName1 		= document.getElementById('namePlayer1')
const $playerName2 		= document.getElementById('namePlayer2')
const $chosePokemon 	= document.getElementById('container-choose-pokemon')
const $txtPokemonID		= document.getElementById('txtPokemonSelected')
const $btnPokemon		= document.getElementById('btnPokemonName')
const $timer			= document.getElementById('container-timer')
const $infoBattle 		= document.getElementById('container-pokemonInfo-battle')
const $pName1 			= document.getElementById('pokemonName1')
const $pType1			= document.getElementById('pokemonType1')
const $pLife1			= document.getElementById('pokemonLife1')
const $pName2 			= document.getElementById('pokemonName2')
const $pType2			= document.getElementById('pokemonType2')
const $pLife2			= document.getElementById('pokemonLife2')

var namePlayer1, namePlayer2
var turno = 1

$start.addEventListener('click', empezar)
$btnPlayer.addEventListener('click', playerName)
$btnPokemon.addEventListener('click', selecPokemon)

function showInstructions() {
	setTimeout(()=> {
		$imgCharging.classList.toggle('hide')
		$instructions.classList.toggle('start')
	}, 2000)
}
function empezar(){
	$instructions.classList.toggle('start')
	$turno.classList.toggle('Turno')
	$chosePlayerName.classList.toggle('choosePlayerName')
	setTimeout(() => $p1.classList.toggle('indicator'), 500)
}
function playerName() {
	switch(turno) {
		case 1:
			if ($txtPlayer.value == '') {
				alert(`Player ${turno}, debes ingresar un nombre de usuario`)
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
				alert(`Player ${turno}, debes ingresar un nombre de usuario`)
			}else{
				namePlayer2 = $txtPlayer.value
				$playerName2.innerHTML = namePlayer2
				turno--
				setTimeout(() => {
					$p2.classList.toggle('indicator')
					$chosePlayerName.classList.toggle('choosePlayerName')
					$chosePokemon.classList.toggle('containerChoosePokemon')
					setTimeout(() => $p1.classList.toggle('indicator'), 500)
					ShowPokemonAvailable()
				}, 400)
			}
		break
	}
}
function loadPokemonInfo() {
	$pName1.innerHTML = pokemonSelectedBattle1.name
	$pType1.innerHTML = pokemonSelectedBattle1.type

	$pName2.innerHTML = pokemonSelectedBattle2.name
	$pType2.innerHTML = pokemonSelectedBattle2.type
}
function makePokemon(n) {
	var i  = n-1
	var pk = listaPD[i]
	pokemonSelected = new Pokemon(pk.id, pk.name, pk.types[0].type.name, pk.base_experience, 100)
	if (turno == 1) {
		pokemonSelectedBattle1 = pokemonSelected
		turno++
		$txtPokemonID.value = ''
		$p1.classList.toggle('indicator')
		$p2.classList.toggle('indicator')
		alert(`${namePlayer1}, Elejiste a ${pokemonSelectedBattle1.name}`)
	} else{
		pokemonSelectedBattle2 = pokemonSelected
		turno--
		$p2.classList.toggle('indicator')
		alert(`${namePlayer2}, Elejiste a ${pokemonSelectedBattle2.name}`)
		$chosePokemon.classList.toggle('containerChoosePokemon')
		$timer.classList.toggle('hide')
		setTimeout(() => {
			loadPokemonInfo()
			$timer.classList.toggle('hide')
			$infoBattle.classList.toggle('pokemonInfoBattle')
			$p1.classList.toggle('indicator')
		}, 2000)
	}
}
function selecPokemon() {
	switch(turno) {
		case 1:
			if ($txtPokemonID.value == '') {
				alert(`Player ${namePlayer1}, no has ingresado ningún ID`)
			}else{
				makePokemon($txtPokemonID.value)
			}
			break
		case 2:
			if ($txtPokemonID.value == '') {
				alert(`Player ${namePlayer2}, no has ingresado ningún ID`)
			}else{
				makePokemon($txtPokemonID.value)
			}
			break
	}
}
showInstructions()