const root = document.querySelector('#root')
const header = document.querySelector('header')
header.classList.add('mb-5', 'shadow-sm')
root.classList.add('container-fluid')

Navbar.render()

// FOR DEV ONLY
Item.getAll()