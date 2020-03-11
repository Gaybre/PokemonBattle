const $start 			= document.getElementById('btnStart')//boton empezar
const $turno 			= document.getElementById('container__turno')//contenedor "Turno"
const $instructions 	= document.getElementById('container__start')//contenedor "Instrucciones"
const $imgCharging 		= document.getElementById('container__timer1')//gif "Cargando"
const $chosePlayerName  = document.getElementById('container__choose-playerName')//Contenedor "Elige tu nombre de maestro Pokemon"
const $p1 				= document.getElementById('p1')//turno player 1
const $p2 				= document.getElementById('p2')//turno player 2
const $btnPlayer 		= document.getElementById('btnPlayerName')//boton "Aceptar" de nombre de usuario
const $txtPlayer 		= document.getElementById('txtPlayerName')//input de nombre de usuario
const $formName			= document.getElementById('formName')//formulario de nombre de usuario
const $playerName1 		= document.getElementById('namePlayer1')//nombre elegido para player1
const $playerName2 		= document.getElementById('namePlayer2')//nombre elegido para player2
const $txtCargando		= document.getElementById('txtCargando')//texto "Cargando" en lista de Pokemon disponibles
const $pokeGif   		= document.getElementById('gifpokemon')//gif "Quien es este Pokemon" en lista de Pokemon disponibles
const $chosePokemon 	= document.getElementById('container__choose-pokemon')//Contenedor "Elige a tu compañero de batalla"
const $txtPokemonID		= document.getElementById('txtPokemonSelected')//input de ID del Pokemon elegido
const $btnPokemon		= document.getElementById('btnPokemonName')//boton "Aceptar" del Pokemon elegido
const $formID			= document.getElementById('formID')//formulario del Pokemon elegido
const $timer			= document.getElementById('container__timer2')//gif "Que gane el mejor"
const $infoBattle 		= document.getElementById('container__pokemonInfo--battle')//Contenedor "Batalla Pokemon"
const $pName1 			= document.getElementById('pokemonName1')
const $pType1			= document.getElementById('pokemonType1')
const $pLevel			= document.getElementById('pokemonLevel1')
const $pLife1			= document.getElementById('pokemonLife1')
const $pName2 			= document.getElementById('pokemonName2')
const $pType2			= document.getElementById('pokemonType2')
const $pLeve2			= document.getElementById('pokemonLevel2')
const $pLife2			= document.getElementById('pokemonLife2')
const $battleMap		= document.getElementById('battleMapID')//backgroud del campo de batalla
const $battleButtons1	= document.getElementById('battleButtonsA')//contenedor de los botones de ataque del pokemon 1
const $battleButtons2	= document.getElementById('battleButtonsB')//contenedor de los botones de ataque del pokemon 2
const $imgPoke1			= document.getElementById('imgPoke1')//imagen del pokemon 1
const $imgPoke2			= document.getElementById('imgPoke2')//imagen del pokemon 2
const $ataque1a 		= document.getElementById('ataque1a')
const $ataque2a			= document.getElementById('ataque2a')
const $ataque3a			= document.getElementById('ataque3a')
const $ataque1b 		= document.getElementById('ataque1b')
const $ataque2b			= document.getElementById('ataque2b')
const $ataque3b			= document.getElementById('ataque3b')
const $playAgain		= document.getElementById('playAgain')//boton "Jugar otra vez"
const $irGH				= document.getElementById('irGH')//imagen del enlace al repositorio en el footer
const $pokemonInicial	= document.getElementById('pokemonInicial')
const $down				= document.getElementById('down')
const $up				= document.getElementById('up')
const URL_API_POKEMON = 'https://pokeapi.co/api/v2/pokemon/id'

var namePlayer1, namePlayer2
var turno   = 1
var combate = 1

$start.addEventListener('click', empezar)
$btnPlayer.addEventListener('click', playerName)
$btnPokemon.addEventListener('click',selectPokemon)
$playAgain.addEventListener('click', playAgain)
$up.addEventListener('click', () => {
	$pokemonInicial.classList.add('hide') 
	$down.classList.remove('hide')
})
$down.addEventListener('click', () => {
	$pokemonInicial.classList.remove('hide') 
	$down.classList.add('hide')
})
//utilizaremos 'preventDefault' en el evento 'submit' para que no se actualice el navegador
$formName.addEventListener('submit', (ev) => {
	ev.preventDefault()
	playerName()
})
//utilizaremos 'preventDefault' en el evento 'submit' para que no se actualice el navegador
$formID.addEventListener('submit', (ev) => {
	ev.preventDefault()
	selectPokemon()
})

//El juego comenzará con el gif 'Cargando' y en 2 segundos se visualizarán las instrucciones
function showInstructions() {
	setTimeout(()=> {
		$imgCharging.classList.toggle('hide')
		$instructions.classList.toggle('start')
		$irGH.classList.add('pulse')
	}, 2000)
}
//Ocultará las instrucciones y mostrará el contenedor para elegir el nombre del player indicando el turno
function empezar(){
	$irGH.classList.remove('pulse')
	loadPokemonAvailable()
	$instructions.classList.toggle('start')
	$turno.classList.toggle('turno')
	$chosePlayerName.classList.toggle('choosePlayerName')
	setTimeout(() => $p1.classList.toggle('indicator'), 500)
}
//restablecerá valores para un nuevo juego desde elegir pokemon
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
	$chosePokemon.classList.add('containerChoosePokemon')
	$infoBattle.classList.remove('pokemonInfoBattle')
	$playAgain.classList.toggle('hide')
	$txtPokemonID.value = ''
	$p2.classList.remove('indicator')
	setTimeout(() => $p1.classList.add('indicator'), 1000)
}
//Validará el input, asignará el nombre al player en turno y lo mostrará en el indicador
//Despues de asignar ambos, pasará al contenedor de 'Elige a tu compañero de batalla'
function playerName() {
	switch(turno) {
		case 1:
			if ($txtPlayer.value == '') {
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
					$pokeGif.classList.add('hide')
					$txtCargando.classList.add('hide')
					$listaPD.classList.remove('hide')
					$p1.classList.toggle('indicator')
				}, 4000)
			}
		break
	}
}
//Recibe un elemento HTML y los atributos que se le asignarán a este elemento
function setImgAttributes($element, attributes) {
	for(let attribute in attributes)
		$element.setAttribute(attribute, attributes[attribute])
}
//Después de instanciar ambos Pokemon, se asignarán los valores para mostrarlos en elementos HTML
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
//Obtendrá 2 valores de forma sincrona e instanciará a los Pokemon elegidos notificando el resultado
async function makePokemon(n) {
	const poke = listaPD[n-1] //simplifica la selección del objeto dentro del array

	await getTypeEsp(poke) //obtiene typeEsp
	await getMovesPokemon(poke) //obtiene movesPokemon
	pokemonSelected = new Pokemon(poke.id, poke.name, typeEsp, movesPokemon, poke.base_experience, 100, poke.sprites.front_default, poke.sprites.back_default)
	//El pokemon instanciado se asignará de acuerdo al turno
	//Despues de asignar ambos, cargará los valores, ataques y posición para comenzar la batalla
	switch(turno) {
		case 1:
			pokemonSelected1 = pokemonSelected
			turno++
			$txtPokemonID.value = ''
			$p1.classList.toggle('indicator')
			$p2.classList.toggle('indicator')
			await swal('Tu equipo:', `${namePlayer1}, Elejiste a ${pokemonSelected1.name}`, 'success')
		break
		case 2:
			pokemonSelected2 = pokemonSelected
			turno--
			$p2.classList.toggle('indicator')
			await swal('Tu equipo:', `${namePlayer2}, Elejiste a ${pokemonSelected2.name}`, 'success')
			$chosePokemon.classList.toggle('containerChoosePokemon')
			$turno.classList.toggle('turno')
			$timer.classList.toggle('hide')
			loadPokemonInfo()
			imgTurnPokemon1()
			turnButtonsA()
			setTimeout(() => {
				loadAttacks(pokemonSelected1, pokemonSelected2)
				$timer.classList.toggle('hide')
				$turno.classList.toggle('turno')
				$infoBattle.classList.toggle('pokemonInfoBattle')
				$p1.classList.toggle('indicator')
				$battleButtons1.classList.toggle('turnButtons')
				$imgPoke1.classList.toggle('imgEnd')
			}, 2000)
		break
	}
}
//Validará el ID ingresado para alertar al usuario o para crear la instancia del Pokemon elegido
function selectPokemon() {
	var turnoNamePlayer//Se le asignará el nombre del player en turno
	img = document.getElementById("imgPokebola")
	img.src = "https://cdn.pixabay.com/photo/2019/11/18/15/46/pokemon-4635112__340.png"
	switch(turno) {
		case 1:
			turnoNamePlayer = namePlayer1
			break
		case 2:
			turnoNamePlayer = namePlayer2
			break
	}

	if ($txtPokemonID.value == '') {
		swal('Elije a tu compañero de lucha', `Player ${turnoNamePlayer}, no has ingresado ningún ID`, 'warning')
		$txtPokemonID.value = ''
	}
	else if (($txtPokemonID.value > TOTAL_POKEMON_DISPONIBLES) || ($txtPokemonID.value < 1)) {
		swal('Elije a tu compañero de lucha', `Player ${turnoNamePlayer}, El ID no corresponde a ningun Pokemon disponible`, 'warning')
		$txtPokemonID.value = ''
	}
	else if ($txtPokemonID.value == 132) {
		//Dito solo tiene la habilidad 'Transformación', al elegirlo pasará a un contenedor con instrucciones
		chooseDito()
		$txtPokemonID.value = ''
	}
	else{
		makePokemon($txtPokemonID.value)
	}
}
//Mostrará a dito y un boton para volver a elegir otro Pokemon antes de la batalla
function chooseDito() {
	const $divDito 	= document.getElementById('container__dito')
	const $imgDito 	= document.getElementById('imgDito')
	const $btnDito 	= document.getElementById('btnDito')
	const urlDito	= listaPD[131].sprites.front_default

	setImgAttributes($imgDito, {
		src:`${urlDito}`,
		width: 200,
	})
	$btnDito.addEventListener('click', () => {
		$divDito.classList.remove('containerDito')
		$divDito.classList.add('hide')
		$chosePokemon.classList.add('containerChoosePokemon')
	})
	$chosePokemon.classList.remove('containerChoosePokemon')
	$divDito.classList.remove('hide')
	$divDito.classList.add('containerDito')
}
//Cambiara tamaño y orientación de las imagenes/botones de la batalla de acuerdo al turno
function nextTurn() {
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
//El Pokemon1 será más grande y de espaldas. El Pokemon2 estará de frente
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
//El Pokemon2 será más grande y de espaldas. El Pokemon1 estará de frente
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
//Cargará en cada boton, los ataques de ambos Pokemon elegidos 
function loadAttacks(ps1, ps2) {
	let a = ps1.attacks//simplifica la selección del atributo attack del Pokemon
	let b = ps2.attacks
	setImgAttributes($ataque1a, {value: `${a[0].name}`})
	setImgAttributes($ataque2a, {value: `${a[1].name}`})
	setImgAttributes($ataque3a, {value: `${a[2].name}`})

	setImgAttributes($ataque1b, {value: `${b[0].name}`})
	setImgAttributes($ataque2b, {value: `${b[1].name}`})
	setImgAttributes($ataque3b, {value: `${b[2].name}`})
}
//Cambia los atributos del Pokemon ganador y lo notifica con una alerta
async function ganador($img, ganador, user) {
	setImgAttributes($img, {
	src: `${ganador.imgFront}`,
	width: 250,
	height: 250,
	})
	$txtBattle.innerHTML += ' ha sido un golpe letal<br/>Fin de la batalla !!'
	await swal(`Combate ${combate}`, `El ganador del combate fue ${ganador.name} del maestro Pokemon ${user}`, 'success')
}
//finaliza el juego con una animación al Pokemon perdedor y muestra el boton para volver a jugar
function perdedor($img, {name}, user) {
	$txtBattle.innerHTML = `<strong>${name}:</strong> No me quiero ir Sr. ${user}....`
	$img.classList.add('pokeByeBye')
	setTimeout(() => {
		$txtBattle.innerHTML = `Fin de la batalla !!`
		$playAgain.classList.toggle('hide')
	}, 4000)
}
//Despues de cada ataque se validará que la vida de cada Pokemon no sea 0 o menos para continuar
async function validarGanador() {
	if (pokemonSelected1.vida < 1) {
		$p2.classList.toggle('indicator')
		await ganador($imgPoke2, pokemonSelected2, namePlayer2)
		setTimeout(() => perdedor($imgPoke1, pokemonSelected1, namePlayer1), 1100)
	}else if (pokemonSelected2.vida < 1) {
		$p1.classList.toggle('indicator')
	    await ganador($imgPoke1, pokemonSelected1, namePlayer1)
		setTimeout(() => perdedor($imgPoke2, pokemonSelected2, namePlayer2), 1100)
	}else{
		nextTurn()
		setTimeout(() => $txtBattle.innerHTML += `<br />La battalla continua...`, 500)
		$battleButtons1.classList.toggle('turnButtons')
		$battleButtons2.classList.toggle('turnButtons')
		$p1.classList.toggle('indicator')
		$p2.classList.toggle('indicator')
		$battleMap.classList.toggle('map2')
		$imgPoke1.classList.toggle('imgEnd')
		$imgPoke2.classList.toggle('imgEnd')
	}
}
//Ejecutará las los efectos del atacante, atacado, defensa, evadir ataque
//Condicionará el valor de daño de acuerdo al nivel de ambos pokemon y actualizará el marcador de vida despues del ataque
function pokeAtack(attack) {
	turnButtonsOf()
	var powerAtack
	var $atacante
	var $atacado
	var $marcador
	var $imgPokeAtacado
	var $imgPokeAtacante
	//Switch asignará valores a las variables locales de acuerdo al turno
	switch(turno) {
		case 1:
			$atacante = pokemonSelected1
			$atacado  = pokemonSelected2
			$marcador = $pLife2
			$imgPokeAtacante = $imgPoke1
			$imgPokeAtacado  = $imgPoke2
			break
		case 2:
			$atacante = pokemonSelected2
			$atacado  = pokemonSelected1
			$marcador = $pLife1
			$imgPokeAtacante = $imgPoke2
			$imgPokeAtacado  = $imgPoke1
			break
	}

	if ($atacante.level > $atacado.level) {
		//si el nivel del atacante es mayor al nivel del atacado
		powerAtack = 30
	}
	else if (($atacante.level/2) > $atacado.level) {
		//si la mitad del nivel del atacante sigue siendo mayor al nivel del atacado
		powerAtack = 50
	}
	else{
		//si el nivel del atacante no es mayor al nivel del atacado
		powerAtack = 15
	}

	$atacante.movimientoAtacar($imgPokeAtacante, $atacante)//Ejecutará el efecto del Pokemon atacante
	$atacante.atacar($atacante, $atacado, attack)//Llama al mensaje de batalla y devuelve un valor verdadero
	/*
	Despues de atacar(), se evaluará la variable booleana verdadera y se ejectutará la animación correspondiente
	para el pokemon atacado, dependiendo la condición cambiará el valor de powerAtack 
	y se devolvera nuevamente a false el valor de la variable booleana*/
	if (evadAtaque) {
		powerAtack = 0
		$atacado.evadirAtaque($imgPokeAtacado)
		evadAtaque = false
	}
	if (useDefense) {
		powerAtack -= 10 
		$atacado.defensaEspecial($imgPokeAtacado)
		useDefense = false
	}
	if (pokeAtacado) {
		$atacado.atacado($imgPokeAtacado)
		pokeAtacado = false
	}

	$atacado.vida -= powerAtack
	if ($atacado.vida < 0) {$atacado.vida = 0}
	$marcador.innerHTML = $atacado.vida

	//Después de ejecutar las animaciones se validará si hay ganador o si la batalla continua
	setTimeout(() => validarGanador(), 1200)
}
//Habilita los ataques del Pokemon1 e inhabilita los del Pokemon2
function turnButtonsA() {
	$ataque1a.addEventListener('click', pokeAtack)
	$ataque2a.addEventListener('click', pokeAtack)
	$ataque3a.addEventListener('click', pokeAtack)

	$ataque1b.removeEventListener('click', pokeAtack)
	$ataque2b.removeEventListener('click', pokeAtack)
	$ataque3b.removeEventListener('click', pokeAtack)
}
//Habilita los ataques del Pokemon2 e inhabilita los del Pokemon1
function turnButtonsB() {
	$ataque1b.addEventListener('click', pokeAtack)
	$ataque2b.addEventListener('click', pokeAtack)
	$ataque3b.addEventListener('click', pokeAtack)

	$ataque1a.removeEventListener('click', pokeAtack)
	$ataque2a.removeEventListener('click', pokeAtack)
	$ataque3a.removeEventListener('click', pokeAtack)
}
//inhabilita los ataques de ambos Pokemon
function turnButtonsOf() {
	$ataque1b.removeEventListener('click', pokeAtack)
	$ataque2b.removeEventListener('click', pokeAtack)
	$ataque3b.removeEventListener('click', pokeAtack)

	$ataque1a.removeEventListener('click', pokeAtack)
	$ataque2a.removeEventListener('click', pokeAtack)
	$ataque3a.removeEventListener('click', pokeAtack)
}
showInstructions()