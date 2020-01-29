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
const $asd 				= document.getElementById('qwe')

var namePlayer1, namePlayer2
var turno = 1

$start.addEventListener('click', empezar)
$btnPlayer.addEventListener('click', playerName)
$btnPokemon.addEventListener('click', selecPokemon)

$asd.addEventListener('click', () => {
	changeImgPosition()
	$battleButtons1.classList.toggle('turnButtons')
	$battleButtons2.classList.toggle('turnButtons')
	$p1.classList.toggle('indicator')
	$p2.classList.toggle('indicator')
	$battleMap.classList.toggle('map2')
	$imgPoke1.classList.toggle('imgEnd')
	$imgPoke2.classList.toggle('imgEnd')
})

function showInstructions() {
	setTimeout(()=> {
		$imgCharging.classList.toggle('hide')
		$instructions.classList.toggle('start')
	}, 2000)
}
function empezar(){
	$instructions.classList.toggle('start')
	$turno.classList.toggle('turno')
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

	imgTurnPokemon1()
}
function makePokemon(n) {
	var i  = n-1
	var pk = listaPD[i]
	pokemonSelected = new Pokemon(pk.id, pk.name, pk.types[0].type.name, pk.base_experience, 100, pk.sprites.front_default, pk.sprites.back_default)
	if (turno == 1) {
		pokemonSelected1 = pokemonSelected
		turno++
		$txtPokemonID.value = ''
		$p1.classList.toggle('indicator')
		$p2.classList.toggle('indicator')
		alert(`${namePlayer1}, Elejiste a ${pokemonSelected1.name}`)
	} else{
		pokemonSelected2 = pokemonSelected
		turno--
		$p2.classList.toggle('indicator')
		alert(`${namePlayer2}, Elejiste a ${pokemonSelected2.name}`)
		$chosePokemon.classList.toggle('containerChoosePokemon')
		$timer.classList.toggle('hide')
		setTimeout(() => {
			loadPokemonInfo()
			$timer.classList.toggle('hide')
			$infoBattle.classList.toggle('pokemonInfoBattle')
			$p1.classList.toggle('indicator')
			$battleButtons1.classList.toggle('turnButtons')
			$imgPoke1.classList.toggle('imgEnd')
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
function changeImgPosition() {
	switch(turno) {
		case 1:
			imgTurnPokemon2()
			$imgPoke1.classList.toggle('rotar')
			$imgPoke2.classList.toggle('rotar')	
			turno++
			break
		case 2:
			imgTurnPokemon1()
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
showInstructions()