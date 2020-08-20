class Item {
  constructor(obj) {
    // debugger
    this.id = obj.id
    this.title = obj.attributes.title
    this.description = obj.attributes.description
    this.serialNumber = obj.attributes.serial_number
    this.isAvailable = obj.attributes.is_available
  }

  static getAll(e) {
    function generateItems(json) {
      return json.data.map(item => new Item(item))
    }

    e.preventDefault()
    // debugger
    if (!document.getElementById('items-table')) {
      fetch('http://127.0.0.1:3000/api/v1/items')
        .then(res => res.json())
        .then(json => generateItems(json))
        .then(items => Item.renderAll(items))
        // .catch(err => document.write(err))
    }
  }

  static renderAll(items) {
    // TABLE
    // VARIABLE DECLARATION/ASSIGNMENT
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
    table.id = "items-table"
    table.classList.add('table', 'table-hover')
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
    root.appendChild(table)
    table.appendChild(thead)
    thead.appendChild(tableHeadersRow)
    tableHeadersRow.appendChild(headerCheck)
    tableHeadersRow.appendChild(headerTitle)
    tableHeadersRow.appendChild(headerDesc)
    tableHeadersRow.appendChild(headerIsAvailable)
    tableHeadersRow.appendChild(headerSerial)
    table.appendChild(tbody)

    for (const item of items) {
      item.render(tbody)
    }
  }

  render = function(tbody) {
    // DECLARATIONS AND ASSIGNMENTS
    // debugger
  }


}