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

$start.addEventListener('click', empezar)
$btnPlayer.addEventListener('click', playerName)

function showInstructions() {
	setTimeout(()=> {
		$imgCharging.classList.toggle('hide')
		$instructions.classList.toggle('start')
	}, 2000)
}
showInstructions()

function empezar(){
	$turno.classList.toggle('Turno')
	$instructions.classList.toggle('start')
	$chosePlayerName.classList.toggle('choosePlayerName')
	$p1.classList.toggle('indicator')
	$footer.classList.add('down')
}
var n = 1
function playerName() {
	switch(n) {
		case 1:
			namePlayer1 = $txtPlayer.value
			$playerName1.innerHTML = $txtPlayer.value
			$txtPlayer.value = ''
			n++
			$p1.classList.toggle('indicator')
			$p2.classList.toggle('indicator')
			break
		case 2:
			namePlayer2 = $txtPlayer.value
			$playerName2.innerHTML = $txtPlayer.value
			n++
		case 3:
			$p2.classList.toggle('indicator')
			$chosePlayerName.classList.toggle('choosePlayerName')
			$chosePokemon.classList.toggle('containerChoosePokemon')
			setTimeout(() => $p1.classList.toggle('indicator'), 500)
	}
}
