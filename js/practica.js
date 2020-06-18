// Con mutaciones
const addToList = (list, item, quantity) => {
	list.push({ // modificamos el argumento `list`
		item,
		quantity
	})
	return list
}

//  Sin mutaciones (inmutabilidad)
const addToList = (list, item, quantity) => {
	const newList = JSON.parse(JSON.stringify(list))
	newList.push({ // modificamos la copia del argumento
		item,
		quantity
	})

	return newList
}


let description = $('#description')
let calories = $('#calories')
let carbs = $('#carbs')
let protein = $('#protein')

description.keypress(() => { description.removeClass('is-invalid') })
calories.keypress(() => { calories.removeClass('is-invalid') })
carbs.keypress(() => { carbs.removeClass('is-invalid') })
protein.keypress(() => { protein.removeClass('is-invalid') })

const validateInputs = () => {
   description.val() ? '' : description.addClass('is-invalid')  
   calories.val() ? '' : calories.addClass('is-invalid') 
   carbs.val() ? '' : carbs.addClass('is-invalid') 
   protein.val() ? '' : protein.addClass('is-invalid')

   if(description.val() && calories.val() && carbs.val() && protein.val()){
     console.log('Campos completos...')
   }
}

/*
Estado compartido o shared state
Shared State significa que diferentes métodos trabajan a partir de una misma variable. y, 
así como aprendimos en clases anteriores, cuando modificamos variables con el mismo objeto 
de referencia podemos encontrarnos con algunos problemas y obtener resultados inesperados
a pesar de ejecutar el mismo código y recibir los mismos parámetros:
*/

// Intento #1
const a = {
        value: 2
}

const addOne = () => a.value += 1
const timesTwo = () => a.value *= 2

addOne()
timesTwo()

console.log(a.value) // 6

// Sin embargo, si ejecutamos las mismas funciones en orden invertido
// obtenemos resultados diferentes

timesTwo()
addOne()

console.log(a.value) // 5 !??

const b = {
    value: 2
}

const addOne = x => Object.assign({}, x, { value: x.value + 1 })
const timesTwo = x => Object.assign({}, x, { value: x.value * 2 })

addOne(b)
timesTwo(b)

// El resultado siempre es el mismo a pesar de
// ejecutar las funciones en orden diferente

timesTwo(b)
addOne(b)

console.log(b.value)


//Closures
function buildSum(a) {
	return function(b) {
		return a + b
	}
}

const buildSum = a => b => a + b
const addFive = buildSum(5)
console.log(addFive(5))

/*
Currying
Gracias a los closures es posible implementar el Currying, descomponer 
funciones complejas en otras funciones más pequeñas donde cada función
recibe un solo argumento. A continuación un ejemplo:
*/

// Sin Currying
function sumThreeNumbers1(a, b, c) {
        return a+b+c
}
console.log("F1 : "+sumThreeNumbers1(1, 2, 7)) // 10

// Closures and Currying
function sumThreeNumbers2(a) {
        return function(b) {
                return function(c) {
                        return a+b+c
                }
        }
}
console.log("F2 : "+sumThreeNumbers2(1)(2)(7)) // 10

// Closures and Currying with arrow function
const sumThreeNumbers3 = a => b => c => a+b+c
console.log("F3 : "+sumThreeNumbers3(1)(2)(7)) // 10

/*
Introducción a las Higher Order Functions
Por ahora, todas las funciones que hemos construido se pueden definir como First Class 
Functions, sin embargo, existen otro tipo de funciones que conocemos como Higher Order 
Functions o funciones de alto orden y podemos distinguirlas porque reciben otra función 
como argumento.
*/

//Un buen ejemplo de funciones de alto orden es la función .map de JavaScript:

// Ciclo for (sin HOF)
const array = [1, 2, 3]
const array2 = []

for (let z = 0; z < array.length; z++) {
	array2.push(array[z] * 2)
}

// Utilizando la función .map (HOF)
const array = [1, 2, 3]
const array2 = array.map(item => item * 3)

// Ambas formas devuelven el mismo resultado,
// sin embargo, utilizando HOFs podemos escribir
// código mucho más legible y fácil de entender
console.log(array2) // [2, 4, 6]

//forma imperativa
const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj)
  const attrs = []

  for (let i = 0; i < keys.length; i++) {
    let attr = keys[i]
    attrs.push(`${attr}="${obj[attr]}"`)
  }
  const string = attrs.join(' ')

  return string
}

//Forma declarativa
const attrsToString = (obj = {}) => Object.keys(obj).map(attr => `${attr}="${obj[attr]}"`).join(' ')
