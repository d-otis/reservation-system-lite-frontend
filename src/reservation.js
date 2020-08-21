class Reservation {
  contructor(obj) {

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
    debugger
  }

  update = function() {
    // Update Reservation
  }

  destroy = function() {
    //destroy reservation
  }
}