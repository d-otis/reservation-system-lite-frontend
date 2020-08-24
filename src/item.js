class Item {
  constructor(obj) {
    // debugger
    this.id = obj.id
    this.title = obj.attributes.title
    this.description = obj.attributes.description
    this.serialNumber = obj.attributes.serial_number
    this.isAvailable = obj.attributes.is_available
  }

  get shortDescription() {
    return this.description.split(". ").map((x, index) => {
      return index <= 1 ? x : ''
    }).filter(x => x != "").join(". ") + "..."
    // debugger
  }

  static generateItems(json) {
    return !!json.included ? json.included.map(item => new Item(item)) : json.data.map(item => new Item(item))
  }

  static getAll(e) {
    if (e) e.preventDefault()

    Array.from(root.children).forEach(e => e.remove())

    if (document.querySelector('#reservations-table')) document.querySelector('#reservations-table').remove()
    if (!document.getElementById('items-table')) {
      fetch('http://127.0.0.1:3000/api/v1/items')
        .then(res => res.json())
        .then(json => Item.generateItems(json))
        .then(items => Item.renderAll(items))
        // .catch(err => document.write(err))
    }
  }

  static renderAll() {
    // TABLE
    // VARIABLE DECLARATION/ASSIGNMENT
    const form = document.createElement('form')
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tableHeadersRow = document.createElement('tr')
    const headerCheck = document.createElement('th')
    const headerTitle = document.createElement('th')
    const headerDesc = document.createElement('th')
    const headerIsAvailable = document.createElement('th')
    const headerSerial = document.createElement('th')
    const tbody = document.createElement('tbody')

    // DETAILS
    form.action = 'http://127.0.0.1:3000/api/v1/reservations'
    form.method = "POST"

    table.id = "items-table"
    table.classList.add('table', 'table-hover', 'mb-5', 'shadow-sm')
    headerCheck.scope = 'col'
    headerTitle.scope = 'col'
    headerDesc.scope = 'col'
    headerIsAvailable.scope = 'col'
    headerSerial.scope = 'col'

    headerCheck.innerText = 'Select'
    headerTitle.innerText = 'Item'
    headerDesc.innerText = 'Description'
    headerIsAvailable.innerText = 'Availability'
    headerSerial.innerText = 'Serial Number'

    // APPEND TABLE HEADERS
    root.appendChild(form)
    // root.appendChild(table)
    form.appendChild(table)
    table.appendChild(thead)
    thead.appendChild(tableHeadersRow)
    tableHeadersRow.appendChild(headerCheck)
    tableHeadersRow.appendChild(headerTitle)
    tableHeadersRow.appendChild(headerDesc)
    tableHeadersRow.appendChild(headerIsAvailable)
    tableHeadersRow.appendChild(headerSerial)
    table.appendChild(tbody)

    for (const item of ITEMS) {
      item.render(tbody)
    }

    function renderCreateReservationBtn() {
      const button = document.createElement('button')
      button.classList.add('btn', 'btn-block', 'btn-secondary', 'mb-5')
      button.type = 'submit'
      button.innerText = "Create Reservation"
      button.id = 'create-reservation'
      button.addEventListener('click', e => {
        e.preventDefault()
        const allChecks = Array.from(document.querySelectorAll('input'))
        const filteredChecks = allChecks.filter(e => e.checked)
        const itemIds = filteredChecks.map(e => e.id)
        Reservation.create(itemIds)
      })

      form.appendChild(button)
    }

    renderCreateReservationBtn()
  }

  render = function(tbody) {
    // DECLARATIONS AND ASSIGNMENTS
    const tr = document.createElement('tr')
    const th = document.createElement('th')
    const checkContainer = document.createElement('div')
    const checkbox = document.createElement('input')
    const itemTitle = document.createElement('td')
    const itemDesc = document.createElement('td')
    const itemIsAvailable = document.createElement('td')
    const itemSerial = document.createElement('td')

    // NODE ATTRS
    th.scope = "row"
    if (!this.isAvailable) tr.classList.add('table-danger')

    checkContainer.classList.add('form-group', 'form-check')

    checkbox.type = "checkbox"
    checkbox.classList.add('form-check-input')
    checkbox.id = this.id
    checkbox.name = `reservation[item_ids][]`
    checkbox.value = this.id
    if (!this.isAvailable) checkbox.disabled = true

    itemTitle.innerText = this.title
    itemDesc.innerText = this.shortDescription
    itemIsAvailable.innerText = this.isAvailable
    itemSerial.innerText = this.serialNumber


    // APPENDS FOR DAYS
    tbody.appendChild(tr)
    tr.appendChild(th)
    th.appendChild(checkContainer)
    checkContainer.appendChild(checkbox)
    tr.appendChild(itemTitle)
    tr.appendChild(itemDesc)
    tr.appendChild(itemIsAvailable)
    tr.appendChild(itemSerial)
  }


}