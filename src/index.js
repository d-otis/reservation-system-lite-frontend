const root = document.querySelector('#root')
const header = document.querySelector('header')
const BASE_URL = "http://127.0.0.1:3000/api/v1"
let ITEMS
let RESERVATIONS
header.classList.add('mb-5', 'shadow-sm')
root.classList.add('container-fluid')

Navbar.render()

// SENDS A POST REQUEST TO PASSED IN CONTROLLER
const create = (obj, controller) => {
  // FORMATS REQUEST BODY BASED CONTROLLER PARAMETER
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
  // Properly Formatted Req Body
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

// UPDATE!
const patch = (resource, e) => {
  let updatedItemIds
  let updateNotes

  if (e.type === 'click') {
    
    const reservation = resource
    const itemId = e.target.dataset.itemId
    updatedItemIds = reservation.itemIds.filter(e => e !== itemId)
    RESERVATIONS.find(r => r === reservation).itemIds = updatedItemIds
    updatedNotes = reservation.notes
  } else if (e === 'submit') {
    
  }

    

  
  // NEED:
    // - reservation.id
    // - notes
    // - item_ids
  // needs to be passed what is changing
  // what's the difference between the two:
    // {reservation: {notes: 'bloop bloop bloop'}}
    // {reservation: {item_ids: [1,2,3]}}
    // NEEDS TO BE COMBINED: 
        // {reservation: {notes: 'bloop bloop, bloop', item_ids: [1,2,3]}}
      // well since the removes are async i
      // can just always pass in both attrs

  const requestBody = {
    reservation: {
      item_ids: updatedItemIds
    }
  }

  const config = {
    method: "patch",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(requestBody)
  }

  fetch(`${BASE_URL}/${resource.type}s/${resource.id}`, config)
    .then(res => res.json())
    .then(json => renderAlert(json))
    .catch(err => console.log(err))
}
// GENERATES NEW INSTANCE OF RESERVATION 
// WHEN CREATED BY USER 
const generator = (json) => {
  // debugger
  if (json.data.type === "reservation") {
    RESERVATIONS.push(new Reservation(json.data))
    return RESERVATIONS.slice(-1)[0]
  } else {
    debugger
  }
}

const destroy = e => {
  const controller = Object.keys(e.target.dataset)[0].split("Id")[0] + "s"
  const id = Object.values(e.target.dataset)[0]
  // remove from DOM
  document.getElementById(id).remove()

  // remove from global object
  const index = RESERVATIONS.findIndex(r => r.id === id)
  RESERVATIONS.splice(index, 1)

  config = {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }
  fetch(`${BASE_URL}/reservations/${id}`, config)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))
}

// RENDERS SHOW PAGE FOR NEWLY CREATED RESERVATION
const renderShow = obj => {
  if (obj.constructor === Reservation) {
    Reservation.render(obj)
  }
}

// FETCH THE WHOLE DANG API
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
// POPULATES ITEMS GLOBAL ARRAY
const generateItems = (json) => {
  ITEMS = json.data.map(item => new Item(item))
}
// POPULATES RESERVATIONS GLOBAL ARRAY
const generateReservations = (json) => {
  RESERVATIONS = json.data.map(reservation => new Reservation(reservation))
}
// CLEARS ALL CHILDREN OF ROOT DIV
const clearContent = () => {
  Array.from(root.children).forEach(e => e.remove())
}

// RENDER USER ALERTS
function renderAlert(json) {
  const alert = document.createElement('div')
  alert.classList.add('alert', 'alert-warning', 'text-center', 'animate__animated', 'animate__fadeInDown')
  alert.role = 'alert'
  alert.innerText = json.message
  root.prepend(alert)
  alert.addEventListener('animationend', function() {
    event.target.classList.remove('animate__fadeInDown')
    event.target.classList.add('animate__fadeOutUp', 'animate__delay-2s')
    event.target.addEventListener('animationend', (e) => e.target.remove())
  })
}

// EVENT LISTENERS
// ITEMS INDEX NAV
document.querySelector('#items-link').addEventListener('click', e => {
  clearContent()
  Item.renderAll()
})
// RESERVATIONS INDEX NAV
document.querySelector('#reservations-link').addEventListener('click', e => {
  clearContent()
  Reservation.renderAll()
})

// MAIN API CALL!
fetchAllData()