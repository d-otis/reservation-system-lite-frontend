class Item {
  constructor(obj) {
    this.id = obj.id
    this.title = obj.attributes.title
    this.description = obj.attributes.description
    this.serialNumber = obj.attributes.serial_number
  }
  // TRUNCATES DESCRIPTION
  get shortDescription() {
    return this.description.split(". ").map((x, index) => {
      return index <= 1 ? x : ''
    }).filter(x => x != "").join(". ") + "..."
    // debugger
  }

  // RENDERS ITEMS INDEX
  static renderAll() {
    // TABLE
    // VARIABLE DECLARATION/ASSIGNMENT
    const form = document.createElement('form')
    const tbody = document.createElement('tbody')
    const tableHeaders = ["Select", "Item", "Description", "Serial Number"]
    const table = generateTableScaffold(tableHeaders)

    // DETAILS
    form.action = 'http://127.0.0.1:3000/api/v1/reservations'
    form.method = "POST"

    table.id = "items-table"
    table.classList.add('table', 'table-hover', 'mb-5', 'shadow-sm')

    // APPEND TABLE HEADERS
    root.appendChild(form)
    form.appendChild(table)
    table.appendChild(tbody)

    // ITERATE OVER ITEMS AND RENDER THEIR ROWS
    for (const item of ITEMS) {
      item.render(tbody)
    }
    // CREATE + RENDER "CREATE RESERVATION" BUTTON
    function renderCreateReservationBtn() {
      const button = document.createElement('button')
      button.classList.add('btn', 'btn-block', 'btn-secondary', 'mb-5')
      button.type = 'submit'
      button.innerText = "Create Reservation"
      button.id = 'create-reservation'

      form.addEventListener('submit', e => {
        e.preventDefault()
        
        create(collectCheckedItems(e.currentTarget), "reservations")
        clearContent()
      })

      form.appendChild(button)
    }

    renderCreateReservationBtn()
  }
  
  // RENDERS ITEM ROW ON ITEM INDEX PAGE
  render = function(tbody) {
    // DECLARATIONS AND ASSIGNMENTS
    const tr = document.createElement('tr')
    const th = document.createElement('th')
    const checkContainer = document.createElement('div')
    const checkbox = document.createElement('input')
    const itemTitle = document.createElement('td')
    const itemDesc = document.createElement('td')
    const itemSerial = document.createElement('td')

    // NODE ATTRS
    th.scope = "row"

    checkContainer.classList.add('form-group', 'form-check')
    itemSerial.classList.add("text-monospace")

    checkbox.type = "checkbox"
    checkbox.classList.add('form-check-input')
    checkbox.id = this.id
    checkbox.name = `reservation[item_ids][]`
    checkbox.value = this.id

    itemTitle.innerText = this.title
    itemDesc.innerText = this.shortDescription
    itemSerial.innerText = this.serialNumber.toUpperCase()

    // APPENDS FOR DAYS
    tbody.appendChild(tr)
    tr.appendChild(th)
    th.appendChild(checkContainer)
    checkContainer.appendChild(checkbox)
    tr.appendChild(itemTitle)
    tr.appendChild(itemDesc)
    tr.appendChild(itemSerial)
  }
}