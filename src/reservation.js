class Reservation {
  constructor(obj) {
    this.id = obj.id
    this.notes = obj.attributes.notes
    this.inProgress = obj.attributes.in_progress
    this.isComplete = obj.attributes.is_complete
    this.numItems = obj.relationships.items.data.length
  }

  static create(itemIds) {

    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept-Type": "application/json"
      },
      body: JSON.stringify({"reservation": {"item_ids": itemIds}})
    }

    document.querySelector('form').remove()

    fetch('http://127.0.0.1:3000/api/v1/reservations', config)
      .then(res => res.json())
      .then(json => renderFromJson(json))
      .catch(err => console.log(err))
  }

  static renderFromJson(json) {

    const reservation = new Reservation(json.data)
    const items = Item.generateItems(json)

    // DECLARATIONS + ASSIGNMENTS
    // ROWS
    const resHeaderRow = document.createElement('div')
    const itemsHeaderRow = document.createElement('div')
    const tableRow = document.createElement('div')
    const notesHeaderRow = document.createElement('div')
    const notesTextAreaRow = document.createElement('div')
    // COLUMNS
    const resHeaderCol = document.createElement('div')
    const itemsHeaderCol = document.createElement('div')
    const tableCol = document.createElement('div')
    const notesHeaderCol = document.createElement('div')
    const notesTextAreaCol = document.createElement('div')
    // CONTENT
    // Reservation Header
    const h1 = document.createElement('h1')
    h1.innerText = `Reservation # ${reservation.id}`
    resHeaderCol.appendChild(h1)
    // Items Header
    const h2 = document.createElement('h2')
    h2.innerText = 'Items'
    itemsHeaderCol.appendChild(h2)
    // Table Proper

    // Notes Header
    const h3 = document.createElement('h3')
    h3.innerText = "Notes"
    notesHeaderCol.appendChild(h3)
    // Notes Textarea
    const textarea = document.createElement('textarea')
    const formGroup = document.createElement('div')

    formGroup.classList.add('form-group')
    notesTextAreaCol.appendChild(formGroup)
    formGroup.appendChild(textarea)
    textarea.rows = "5"
    textarea.classList.add('form-control')

    // SET ATTRIBUTES/PROPERTIES
    // ROWS
    resHeaderRow.classList.add('row', 'mb-5')
    resHeaderRow.id = "res-header-row"
    itemsHeaderRow.classList.add('row')
    itemsHeaderRow.id = "items-header-row"
    tableRow.classList.add('row')
    tableRow.id = "table-row"
    notesHeaderRow.classList.add('row', 'mt-5')
    notesHeaderRow.id = "notes-header-row"
    notesTextAreaRow.classList.add('row')
    notesTextAreaRow.id = "notes-textarea-row"
    // COLUMNS
    resHeaderCol.classList.add('col-sm-10', 'offset-sm-1')
    itemsHeaderCol.classList.add('col-sm-10', 'offset-sm-1')
    tableCol.classList.add('col-sm-10', 'offset-sm-1')
    notesHeaderCol.classList.add('col-sm-5', 'offset-sm-1')
    notesTextAreaCol.classList.add('col-sm-5', 'offset-sm-1')

    // APPENDS FOR DAYS
    root.appendChild(resHeaderRow)
    resHeaderRow.appendChild(resHeaderCol)

    root.appendChild(itemsHeaderRow)
    itemsHeaderRow.appendChild(itemsHeaderCol)



    root.appendChild(notesHeaderRow)
    notesHeaderRow.appendChild(notesHeaderCol)
    root.appendChild(notesTextAreaRow)
    notesTextAreaRow.appendChild(notesTextAreaCol)
  }

  static getAll(e) {
    function generateReservations(json) {
      return json.data.map(reservation => new Reservation(reservation))
    }

    if (e) e.preventDefault()
    if (document.querySelector('form')) document.querySelector('form').remove()

    if (!document.querySelector('#reservations-table')) {
      fetch('http://127.0.0.1:3000/api/v1/reservations/')
      .then(res => res.json())
      .then(json => generateReservations(json))
      .then(reservations => Reservation.renderAll(reservations))
      .catch(err => console.log(err))
    }
  }

  static renderAll(reservations) {
    // DECLARATIONS + ASSIGNMENTS
    const table = document.createElement("table")
    const thead = document.createElement("thead")
    const headersRow = document.createElement("tr")
    const headerId = document.createElement("th")
    const headerNotes = document.createElement("th")
    const headerNumItems = document.createElement("th")
    const headerShow = document.createElement("th")
    const headerDelete = document.createElement("th")
    const tbody = document.createElement("tbody")

    // ELEMENT ATTRIBUTES
    table.id = "reservations-table"
    table.classList.add('table', 'table-hover')
    headerId.scope = "col"
    headerNotes.scope = "col"
    headerNumItems.scope = "col"
    headerDelete.scope = "col"
    headerShow.scope = 'col'

    // HEADERS INNERTEXT
    headerId.innerText = "Reservation ID"
    headerNotes.innerText = "Notes"
    headerNumItems.innerText = "Number of Items"
    headerShow.innerText = "View"
    headerDelete.innerText = "Delete"

    // APPENDS
    root.appendChild(table)
    table.appendChild(thead)
    thead.appendChild(headersRow)
    headersRow.appendChild(headerId)
    headersRow.appendChild(headerNotes)
    headersRow.appendChild(headerNumItems)
    headersRow.appendChild(headerShow)
    headersRow.appendChild(headerDelete)
    table.appendChild(tbody)

    for (const reservation of reservations) {
      reservation.render(tbody)
    }
  }

  render = function(tbody) {
    // DECLARATIONS + ASSIGNMENTS
    const tr = document.createElement('tr')
    const thResId = document.createElement('th')
    const resNotes = document.createElement('td')
    const resNumItems = document.createElement('td')
    const resShowTd = document.createElement('td')
    const resDeleteTd = document.createElement('td')
    const viewBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')

    // EVENT LISTENERS
    // SHOW/EDIT EVENT LISTENER
    viewBtn.addEventListener('click', e => {
      const id = e.target.dataset.id
      fetch(`http://127.0.0.1:3000/api/v1/reservations/${id}`)
        .then(res => res.json())
        .then(json => Reservation.renderFromJson(json))
        .catch(err => console.log(err))
    })

    // ELEMENT ATTRIBUTES/PROPERTIES
    thResId.scope = 'row'
    thResId.innerText = this.id
    resNotes.innerText = this.notes
    resNumItems.innerText = this.numItems
    deleteBtn.classList.add('btn', 'btn-sm', 'btn-danger')
    deleteBtn.innerText = "Delete"
    deleteBtn.dataset.id = this.id
    viewBtn.innerText = 'View'
    viewBtn.classList.add('btn', 'btn-sm', 'btn-secondary')
    viewBtn.dataset.id = this.id

    // APPENDS
    tbody.appendChild(tr)
    tr.appendChild(thResId)
    tr.appendChild(resNotes)
    tr.appendChild(resNumItems)
    tr.appendChild(resShowTd)
    tr.appendChild(resDeleteTd)
    resShowTd.appendChild(viewBtn)
    resDeleteTd.appendChild(deleteBtn)
  }

  update = function() {
    // Update Reservation
  }

  destroy = function() {
    //destroy reservation
  }
}