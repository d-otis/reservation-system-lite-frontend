class Reservation {
  constructor(obj) {
    this.type = obj.type
    this.id = obj.id
    this.notes = obj.attributes.notes || "Add your own notes here."
    this.itemIds = obj.relationships.items.data.map(e => e.id)
  }

  get numItems() {
    return this.itemIds.length
  }

  // RENDERS RESERVATION SHOW PAGE
  static render(obj) {
    removeSearch()

    // APPEND ITEM ROWS TO TBODY
    function appendItemsTableTo(el, items) {
      // DECLARATIONS + ASSIGMENTS
      const tbody = document.createElement('tbody')
      const tableHeaders = ["Item ID", "Name", "Serial Number", "Remove"]
      const table = generateTableScaffold(tableHeaders)

      // ELEMENT ATTRIBUTES
      table.classList.add('table')
      table.id = ("reservation-show-table")

      // BOILER APPENDS
      table.appendChild(tbody)

      // RENDER ITEM ROWS
      for (const item of items) {
        const tr = document.createElement('tr')
        const id = document.createElement("th")
        const title = document.createElement("td")
        const serial = document.createElement("td")
        const removeTd = document.createElement("td")
        const removeBtn = document.createElement("button")

        tr.id = item.id
        id.scope = "row"
        id.innerText = item.id
        title.innerText = item.title
        serial.innerText = item.serialNumber.toUpperCase()
        serial.classList.add('text-monospace')
        removeTd.appendChild(removeBtn)
        removeBtn.innerText = "remove"
        removeBtn.type = "button"
        removeBtn.dataset.itemId = item.id
        removeBtn.dataset.reservationId = reservation.id
        removeBtn.classList.add('btn', 'btn-danger', 'btn-sm')

        removeBtn.addEventListener('click', e => {
          const rowId = e.target.dataset.itemId
          document.getElementById(rowId).remove()
          patch(reservation, e)
        })

        tr.appendChild(id)
        tr.appendChild(title)
        tr.appendChild(serial)
        tr.appendChild(removeTd)

        tbody.appendChild(tr)
      }

      // append table
      el.appendChild(table)
    }

    function renderItemsModal() {
      // DECLARATIONS + ASSIGNMENTS
      const mainModalDiv = document.createElement('div')
      const modalDialogDiv = document.createElement('div')
      const modalContentDiv = document.createElement('div')
      const modalHeaderDiv = document.createElement('div')
      const modalTitleH5 = document.createElement('h5')
      const closeButton = document.createElement('button')
      const span = document.createElement('span')
      const modalBody = document.createElement('div')
      const modalFooter = document.createElement('div')
      const cancelButton = document.createElement('button')
      const addItemsSave = document.createElement('input')
      const addItemsForm = document.createElement('form')
      const tableHeaders = ["Select", "Item"]
      const selectTable = generateTableScaffold(tableHeaders)

      addItemsForm.addEventListener('submit', e => {
        if (e) e.preventDefault()
          
        patch(reservation, e, collectCheckedItems(e.currentTarget))
        clearContent()
        document.querySelector('body').classList.remove('modal-open')
        document.querySelector('.modal-backdrop').remove()
        Reservation.render(reservation)
      })

      // ATTRIBUTES
      mainModalDiv.classList.add("modal", "fade")
      mainModalDiv.id = "items-modal"
      mainModalDiv.tabIndex = "-1"
      mainModalDiv.ariaRoleDescription = "dialog"
      mainModalDiv.ariaLabelledBy = "select-modal-title"
      mainModalDiv.ariaHidden = "true"

      modalDialogDiv.classList.add("modal-dialog", "modal-dialog-centered")
      modalDialogDiv.ariaRoleDescription = "document"

      modalContentDiv.classList.add("modal-content")

      modalHeaderDiv.classList.add("modal-header")

      modalTitleH5.classList.add("modal-title")
      modalTitleH5.id = "select-modal-title"
      modalTitleH5.innerText = "Select Items to Add to Reservation"

      closeButton.classList.add("close")
      closeButton.type = "button"
      closeButton.dataset.dismiss = "modal"
      closeButton.areaLabel = "Close"

      span.ariaHidden = "true"
      span.innerHTML = "&times;"

      modalBody.classList.add("modal-body")

      selectTable.classList.add('table', 'table-hover')

      modalFooter.classList.add('modal-footer')

      cancelButton.type = "button"
      cancelButton.dataset.dismiss = "modal"
      cancelButton.classList.add('btn', 'btn-secondary')
      cancelButton.innerText = "Cancel"

      addItemsSave.type = "submit"
      addItemsSave.classList.add('btn', 'btn-primary')
      addItemsSave.value = "Add Items"

      // APPENDS
      mainModalDiv.appendChild(modalDialogDiv)
      modalDialogDiv.appendChild(modalContentDiv)
      modalContentDiv.appendChild(modalHeaderDiv)
      modalHeaderDiv.appendChild(modalTitleH5)
      modalHeaderDiv.appendChild(closeButton)
      closeButton.appendChild(span)
      modalContentDiv.appendChild(modalBody)
      addItemsForm.appendChild(selectTable)
      addItemsForm.appendChild(modalFooter)
      modalFooter.appendChild(cancelButton)
      modalFooter.appendChild(addItemsSave)
      modalBody.appendChild(addItemsForm)

      // Renders 'Add Items' modal
      function renderTbody() {
        // accepts a list of items 
        // not included in this reservation!
        const tbody = document.createElement('tbody')
        const availableItems = ITEMS.filter(item => !reservation.itemIds.includes(item.id))
        for (const item of availableItems) {
          const tr = document.createElement('tr')
          const th = document.createElement('th')
          const formGroup = document.createElement('div')
          const check = document.createElement('input')
          const td = document.createElement('td')

          th.scope = "row"
          formGroup.classList.add('form-group', 'form-check')
          check.type = "checkbox"
          check.classList.add('form-check-input')
          check.dataset.itemId = item.id
          check.value = item.id
          td.innerText = item.title
          
          tr.appendChild(th)
          th.appendChild(formGroup)
          formGroup.appendChild(check)
          tr.appendChild(td)

          tbody.appendChild(tr)
        }

        return tbody
      }

      selectTable.appendChild(renderTbody())
      return mainModalDiv
    }

    const reservation = obj
    const items = ITEMS.filter((i) => {
      return reservation.itemIds.includes(i.id)
    })

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
    const form = document.createElement('form')

    // CONTENT
    // Reservation Header
    const h1 = document.createElement('h1')
    h1.innerText = `Reservation # ${reservation.id}`
    resHeaderCol.appendChild(h1)
    // Items Header
    const h2 = document.createElement('h2')
    h2.innerText = 'Items'
    h2.style.display = "inline"
    itemsHeaderCol.appendChild(h2)
    const addItemsButton = document.createElement('button')
    addItemsButton.type = "button"
    addItemsButton.classList.add('btn', 'btn-sm', 'btn-primary', 'ml-3', 'mb-2')
    addItemsButton.innerText = "Add Items"
    addItemsButton.dataset.toggle = "modal"
    addItemsButton.dataset.target = "#items-modal"

    itemsHeaderCol.appendChild(addItemsButton)
    // Table Proper

    // Notes Header
    const h3 = document.createElement('h3')
    h3.innerText = "Notes"
    notesHeaderCol.appendChild(h3)
    // Notes Form Parent

    // Notes Textarea
    const textarea = document.createElement('textarea')
    const saveButton = document.createElement('input')
    const formGroup = document.createElement('div')

    form.appendChild(formGroup)

    formGroup.classList.add('form-group')
    formGroup.appendChild(textarea)

    notesTextAreaCol.appendChild(form)
    
    textarea.rows = "5"
    textarea.cols = "100"
    textarea.classList.add('form-control')
    textarea.dataset.id = reservation.id
    textarea.value = reservation.notes

    saveButton.value = "Save"
    saveButton.type = "submit"
    saveButton.dataset.reservationId = reservation.id
    saveButton.classList.add('btn', 'btn-primary')

    // TEXT AREA CHANGES
    form.addEventListener('submit', e => {
      if (e) e.preventDefault()

      patch(reservation, e)
    })

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
    // h1 - RESERVATION #
    root.appendChild(resHeaderRow)
    resHeaderRow.appendChild(resHeaderCol)
    // h2 - Items
    root.appendChild(itemsHeaderRow)
    itemsHeaderRow.appendChild(itemsHeaderCol)
    // Items Table
    root.appendChild(tableRow)
    tableRow.appendChild(tableCol)
    appendItemsTableTo(tableCol, items)

    // h3 - Notes
    root.appendChild(notesHeaderRow)
    root.appendChild(notesTextAreaRow)
    notesHeaderRow.appendChild(notesHeaderCol)
    notesTextAreaRow.appendChild(notesTextAreaCol)
    form.appendChild(saveButton)

    // RENDER MODAL
    root.appendChild(renderItemsModal())
  }

  // Renders Reservation Index Page
  static renderAll(matches = null) {
      const reservationsIndex = matches ? matches : RESERVATIONS
      const tbody = document.createElement("tbody")
      const tableHeaders = ["Reservation ID", "Notes", "Number of Items", "View", "Delete"]
      const table = generateTableScaffold(tableHeaders)

      // Search Bar
      if (searchContainer.childElementCount === 0) {
        searchContainer.classList.add("container", 'my-5')
        const search = document.createElement('input')
        search.type = "text"
        search.placeholder = "Search by Reservation ID"
        search.classList.add("form-control" , "form-control-lg")

        searchContainer.appendChild(search)
        search.addEventListener('input', e => {
          const input = e.target.value

          if (input) {
            const matchedReservations = RESERVATIONS.filter(r => r.id.startsWith(input))
            clearContent()
            this.renderAll(matchedReservations)
          } else {
            clearContent()
            this.renderAll()
          }
        })
      }

      // ELEMENT ATTRIBUTES
      table.id = "reservations-index-table"
      table.classList.add('table', 'table-hover')

      // APPENDS
      root.appendChild(table)
      table.appendChild(tbody)

      for (const reservation of reservationsIndex) {
        reservation.renderRow(tbody)
      }
  }

  // RENDERS SINGLE ROW OF RESERVATION INDEX
  renderRow = function(tbody) {
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
      clearContent()
      const reservation = RESERVATIONS.find(r => r.id === id)
      Reservation.render(reservation)
    })

    deleteBtn.addEventListener('click', destroy)

    // ELEMENT ATTRIBUTES/PROPERTIES
    tr.id = this.id
    thResId.scope = 'row'
    thResId.innerText = this.id
    resNotes.innerText = this.notes
    resNumItems.innerText = this.numItems
    deleteBtn.classList.add('btn', 'btn-sm', 'btn-danger')
    deleteBtn.innerText = "Delete"
    deleteBtn.dataset.reservationId = this.id
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
}