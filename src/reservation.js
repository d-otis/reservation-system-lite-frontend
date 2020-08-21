class Reservation {
  constructor(obj) {
    this.notes = obj.attributes.notes
    this.inProgress = obj.attributes.in_progress
    this.isComplete = obj.attributes.is_complete
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
    
    fetch('http://127.0.0.1:3000/api/v1/reservations/')
    .then(res => res.json())
    .then(json => generateReservations(json))
    .catch(err => console.log(err))
  }

  update = function() {
    // Update Reservation
  }

  destroy = function() {
    //destroy reservation
  }
}