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
  const formatObj = (obj, controller) => {
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
      return {
        reservation: {
          item_ids: obj
        }
      }
    }
  }
  // 
  const newObj = formatObj(obj, controller)
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
    .then(obj => renderShow(obj))
    .catch(err => console.log(err))
}

const generator = (json) => {
  // debugger
  if (json.data.type === "reservation") {
    RESERVATIONS.push(new Reservation(json.data))
    return RESERVATIONS.slice(-1)[0]
  } else {
    debugger
  }
}

// RENDERS SHOW PAGE FOR NEWLY CREATED RESERVATION
const renderShow = obj => {
  if (obj.constructor === Reservation) {
    Reservation.render(obj)
  }
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

const clearContent = () => {
  Array.from(root.children).forEach(e => e.remove())
}

// EVENT LISTENERS
document.querySelector('#items-link').addEventListener('click', e => {
  // console.log('clicked items nav')
  clearContent()
  Item.renderAll()
})

document.querySelector('#reservations-link').addEventListener('click', e => {
  clearContent()
  Reservation.renderAll()
})


// MAIN APP CALL!
fetchAllData()