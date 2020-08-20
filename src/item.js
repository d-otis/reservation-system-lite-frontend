class Item {
  constructor(obj) {
    // debugger
    this.id = obj.id
    this.title = obj.attributes.title
    this.description = obj.attributes.description
    this.serialNumber = obj.attributes.serial_number
    this.isAvailable = obj.attributes.is_available
  }

  static get(e) {
    e.preventDefault()
    fetch()
  }


}