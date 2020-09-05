class Jumbotron {
  static render() {
    // Declarations + Assignments
    const frag = document.createDocumentFragment()

    const jumboContainer = document.createElement('div')
    const jumbotron = document.createElement('div')
    const h1 = document.createElement('h1')
    const lead = document.createElement('p')
    const hr = document.createElement('hr')
    const innerContainer = document.createElement('div')
    const row = document.createElement('div')
    const itemsCol = document.createElement('div')
    const resCol = document.createElement('div')
    const itemsButton = document.createElement('button')
    const resButton = document.createElement('button')
    const itemsIcon = document.createElement('i')
    const resIcon = document.createElement('i')

    // Attributes
    jumbotron.classList.add('jumbotron')

    h1.classList.add('display-4')
    h1.innerText = "Reservation System Lite"

    lead.classList.add('lead')
    lead.innerText = "Please select an option"

    hr.classList.add('my-4')

    innerContainer.classList.add("container")

    row.classList.add('row')

    itemsCol.classList.add("col")
    resCol.classList.add("col")

    itemsButton.classList.add('btn', 'btn-secondary', 'btn-block')
    itemsButton.innerText = "Items "
    itemsButton.type = "button"
    itemsButton.id = "items-jumbo"

    resButton.classList.add('btn', 'btn-secondary', 'btn-block')
    resButton.innerText = "Reservations "
    resButton.type = "button"
    resButton.id = "reservations-jumbo"

    itemsIcon.classList.add('fas', 'fa-tv')
    resIcon.classList.add('far', 'fa-list-alt')

    // Appends
    jumboContainer.appendChild(jumbotron)
    jumbotron.appendChild(h1)
    jumbotron.appendChild(lead)
    jumbotron.appendChild(hr)
    jumbotron.appendChild(innerContainer)
    innerContainer.appendChild(row)
    row.appendChild(itemsCol)
    row.appendChild(resCol)
    itemsCol.appendChild(itemsButton)
    itemsButton.appendChild(itemsIcon)
    resCol.appendChild(resButton)
    resButton.appendChild(resIcon)

    frag.appendChild(jumboContainer)

    root.appendChild(frag)
  }
}