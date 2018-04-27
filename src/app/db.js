export class DB {
  constructor () {
    this.data = {}
  }
  set (key, data) {
    this.data[key] = data
  }
  get (key) {
    return this.data[key]
  }
}

const db = new DB()

export default db
