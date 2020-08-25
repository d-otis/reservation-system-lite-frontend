const root = document.querySelector('#root')
const header = document.querySelector('header')
const BASE_URL = "http://127.0.0.1:3000/api/v1"
let ITEMS
let RESERVATIONS
header.classList.add('mb-5', 'shadow-sm')
root.classList.add('container-fluid')

Navbar.render()

const create = (obj, controller) => {
  // ITEM
  const formattedObj = (obj, controller) => {
    // debugger
    if (controller === "items") {
      // debugger
      return {
        item: {
          title: obj.title,
          description: obj.description,
          serial_number: obj.serial_number,
          is_available: true
        }
      }
    } else {
      debugger
    }
  }
  // 
  const newObj = formattedObj(obj, controller)
  // debugger
  const config = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newObj)
  }

  fetch(`${BASE_URL}/${controller}`, config)
    .then(res => res.json())
    .then(json => generator(json))
    .catch(err => console.log(err))
}

const generator = (json) => {
  // the JSON response generated from Rails API
  // need to generate it according to what item it is
  console.log(json)
}

const exampleItem = {
  title: 'the title',
  description: 'the',
  serial_number: "5-+949964+49",
  is_available: true
}


// FETCH THE WHOLE SHEBANG
const fetchAllData = () => {
  // Items
  fetch(`${BASE_URL}/items`)
    .then(res => res.json())
    .then(json => generateItems(json))
    // .then(items => )

  fetch(`${BASE_URL}/reservations`)
    .then(res => res.json())
    .then(json => generateReservations(json))
}

const generateItems = (json) => {
  ITEMS = json.data.map(item => new Item(item))
}

const generateReservations = (json) => {
  RESERVATIONS = json.data.map(reservation => new Reservation(reservation))
}

// EVENT LISTENERS
document.querySelector('#items-link').addEventListener('click', e => {
  // console.log('clicked items nav')
  while (root.children.length > 0) {
    root.firstChild.remove()
  }
  Item.renderAll()
})

document.querySelector('#reservations-link').addEventListener('click', e => {
  while (root.children.length > 0) {
    root.firstChild.remove()
  }
  Reservation.renderAll()
})


// MAIN APP CALL!
fetchAllData()