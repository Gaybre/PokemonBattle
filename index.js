const $start 			= document.getElementById('btnStart')
const $turno 			= document.getElementById('turno')
const $instructions 	= document.getElementById('container-start')
const $imgCharging 		= document.getElementById('charging')
const $footer 			= document.getElementById('footer')
const $chosePlayerName  = document.getElementById('container-choose-playerName')
const $p1 				= document.getElementById('p1')
const $p2 				= document.getElementById('p2')
const $btnPlayer 		= document.getElementById('btnPlayerName')
const $txtPlayer 		= document.getElementById('choosingPlayerName')
const $playerName1 		= document.getElementById('namePlayer1')
const $playerName2 		= document.getElementById('namePlayer2')
const $chosePokemon 	= document.getElementById('container-choose-pokemon')
var namePlayer1, namePlayer2
var n = 1

$start.addEventListener('click', empezar)
$btnPlayer.addEventListener('click', playerName)

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
	$footer.classList.add('down')
	setTimeout(() => $p1.classList.toggle('indicator'), 500)
}
function playerName() {
	switch(n) {
		case 1:
			if ($txtPlayer.value == '') {
				alert(`Player ${n}, debes ingresar un nombre de usuario`)
			}else{
				namePlayer1 = $txtPlayer.value
				$playerName1.innerHTML = namePlayer1
				$txtPlayer.value = ''
				n++
				$p1.classList.toggle('indicator')
				$p2.classList.toggle('indicator')
			}
		break
		case 2:
			if ($txtPlayer.value == '') {
				alert(`Player ${n}, debes ingresar un nombre de usuario`)
			}else{
				namePlayer2 = $txtPlayer.value
				$playerName2.innerHTML = namePlayer2
				n--
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
showInstructions()
