const root = document.querySelector('#root')
const header = document.querySelector('header')
const BASE_URL = "http://127.0.0.1:3000/api/v1"
let ITEMS
let RESERVATIONS
header.classList.add('mb-5', 'shadow-sm')
root.classList.add('container-fluid')

Navbar.render()

// FOR DEV ONLY
// Item.getAll()
Reservation.getAll()