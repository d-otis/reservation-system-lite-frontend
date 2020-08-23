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
    debugger
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
    // viewBtn.addEventLister('click', function(e) {
    //   // debugger
    // })

    // ELEMENT ATTRIBUTES/PROPERTIES
    thResId.scope = 'row'
    thResId.innerText = this.id
    resNotes.innerText = this.notes
    resNumItems.innerText = this.numItems
    deleteBtn.classList.add('btn', 'btn-sm', 'btn-danger')
    deleteBtn.innerText = "Delete"
    deleteBtn.dataset.deleteReservation = this.id
    viewBtn.innerText = 'View'
    viewBtn.classList.add('btn', 'btn-sm', 'btn-secondary')
    viewBtn.dataset.viewReservation = this.id

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