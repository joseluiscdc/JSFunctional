const compose = (...functions) => data => functions.reduceRight((value, func) => func(value), data)

const $ = id => document.getElementById(id)
let list = []

const attrsToString = (obj = {}) => Object.keys(obj).map(attr => `${attr}="${obj[attr]}"`).join(' ')

const tagAttrs = obj => (content = '') => `<${obj.tag}${obj.attrs ? ' ' :	 ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`

const tag = t => typeof t === 'string' ? tagAttrs({ tag: t }) : tagAttrs(t)

const tableRowTag = tag('tr')
const tableRow = items => compose(tableRowTag, tableCells)(items)

const tableCell = tag('td')
const tableCells = items => items.map(tableCell).join('')

const inputCell = tag('input')
const inputsCells = items => items.map(inputCell).join('')

const trashIcon = tag({tag: 'i', attrs: {class: 'fas fa-trash-alt'}})('')
const editIcon = tag({tag: 'i', attrs: {class: 'fas fa-pencil-alt'}})('')
const saveIcon = tag({tag: 'i', attrs: {class: 'fas fa-sync-alt'}})('')

let formInputs = {
  description: $('description'),
  calories: $('calories'),
  carbs: $('carbs'),
  protein: $('protein'),
}

let {description, calories, carbs, protein } = formInputs

const inputEntries = Object.entries(formInputs)

const validateInputs = () => {
  inputEntries.forEach(prop => {
    if (!prop[1].value) {
      formInputs[`${prop[0]}`].classList.add('is-invalid')
    }
  });

  if(Object.values(formInputs).every(({ value }) => value)) {
    add()
  }
}

const updateTotals = () => {
  let cal = 0, car = 0, pro = 0

  list.map(item => {
    cal += item.calories,
    car += item.carbs,
    pro += item.protein
  })

  document.getElementById('totalCalories').textContent = cal
  document.getElementById('totalCarbs').textContent = car
  document.getElementById('totalProteins').textContent = pro
}

const removeInvalidType = () => {
  inputEntries.forEach(prop => {
    prop[1].addEventListener('keypress', () => {
      formInputs[`${prop[0]}`].classList.remove('is-invalid')
    });
  })
}

removeInvalidType()

const add = () => {
  const newItem = {
    description: description.value,
    calories: parseInt(calories.value),
    carbs: parseInt(carbs.value),
    protein: parseInt(protein.value)
  }

  list.push(newItem)
  updateTotals()
  cleanInputs()
  renderItems()
}

const cleanInputs = () => {
    description.value = ''
    calories.value = ''
    carbs.value = ''
    protein.value = ''
}

const renderItems = () => {  
  const listWrapper = document.querySelector('tbody')
  listWrapper.innerHTML = ""  

  list.map((item, index) => {    
    const removeButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-danger',
        onclick: `removeItem(${index})`
      }
    })(trashIcon)

    const editButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-info',
        onclick: `editItem(${index})`
      }
    })(editIcon)

    listWrapper.innerHTML += tableRow([
			item.description, 
			item.calories, 
			item.carbs, 
      item.protein,
      `${removeButton} ${editButton}`
		])
  })
}

const removeItem = (index) => {
    list = list.filter((item,i) => i !== index)
    updateTotals()
    renderItems()
}

const editItem = (index) => {
  const item = list[(index)]
  console.log(item)
  updateTotals()
  renderEditItems()
}

const renderEditItems = () => {  
  const listWrapper = document.querySelector('tbody')
  listWrapper.innerHTML = ""  

  list.map((item, index) => {
    const inputDescription = tag({
      tag: 'input',
      attrs: {
        type: 'text',
        value: `${item.description}`,
        class: 'form-control mb-2 mr-sm-2'
      }
    })()

    const inputCalories = tag({
      tag: 'input',
      attrs: {
        type: 'text',
        value: `${item.calories}`,
        class: 'form-control md-2 xs-2'
      }
    })()

    const inputCarbs = tag({
      tag: 'input',
      attrs: {
        type: 'text',
        value: `${item.carbs}`,
        class: 'form-control md-2 xs-2'
      }
    })()

    const inputProtein = tag({
      tag: 'input',
      attrs: {
        type: 'text',
        value: `${item.protein}`,
        class: 'form-control md-2 xs-2'
      }
    })()

    const saveButton = tag({
      tag: 'button',
      attrs: {
        class: 'btn btn-outline-info',
        onclick: `saveItem(${index})`,
        title: 'Save'
      }
    })(saveIcon)

    listWrapper.innerHTML += tableRow([
			inputDescription, 
			inputCalories, 
			inputCarbs, 
      inputProtein,
      saveButton
		])
  })
}
