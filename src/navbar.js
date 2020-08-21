class Navbar {
  constructor() {}

  static render() {
    // DECLARATIONS + ASSIGNMENTS
    const nav = document.createElement('nav')
    const brand = document.createElement('a')
    const hamburger = document.createElement('button')
    const icon = document.createElement('span')
    const collapseContainer = document.createElement('div')
    const collapseInner = document.createElement('div')
    const itemsLink = document.createElement('a')
    const reservationsLink = document.createElement('a')

    // ATTRS + CLASSES
    // NAV STUFF
    nav.classList.add('navbar', 'navbar-expand-md', 'navbar-light', 'bg-light')

    brand.classList.add('navbar-brand')
    brand.innerText = "Reservation System"

    hamburger.classList.add('navbar-toggler')
    hamburger.type = 'button'
    hamburger.dataset.toggle = 'collapse'
    hamburger.dataset.target = '#navbarNavAltMarkup'

    icon.classList.add("navbar-toggler-icon")

    collapseContainer.classList.add("collapse", "navbar-collapse")
    collapseContainer.id = 'navbarNavAltMarkup'

    collapseInner.classList.add('navbar-nav')

    // ITEMS
    itemsLink.classList.add('nav-item', 'nav-link')
    itemsLink.innerText = "Items"
    itemsLink.id = "items-link"

    // RESERVATIONS
    reservationsLink.classList.add('nav-item', 'nav-link')
    reservationsLink.innerText = "Reservations"
    reservationsLink.id = "reservations-link"

    // APPEND
    header.appendChild(nav)
    nav.appendChild(brand)
    nav.appendChild(hamburger)
    hamburger.appendChild(icon)
    nav.appendChild(collapseContainer)
    collapseContainer.appendChild(collapseInner)
    collapseInner.appendChild(itemsLink)
    collapseInner.appendChild(reservationsLink)

    // ADD EVENT LISTENERS FOR LINKS
    itemsLink.addEventListener('click', Item.getAll)
  }
}