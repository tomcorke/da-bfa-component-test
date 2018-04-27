const path = require('path')
const fs = require('fs')

require('dotenv-safe').config()

const SAVE_DATA_FILE = process.env.SAVE_DATA_FILE
const saveDataFilePath = path.join(__dirname, '../../', SAVE_DATA_FILE)

export class DB {
  constructor () {
    try {
      const rawData = fs.readFileSync(saveDataFilePath, 'utf8')
      this.data = JSON.parse(rawData)
    } catch (e) {
      console.error(`Error loading data: ${e.message}`)
      this.data = {}
    }
  }
  set (key, data) {
    this.data[key] = data
    try {
      fs.writeFileSync(saveDataFilePath, JSON.stringify(this.data), 'utf8')
    } catch (e) {
      console.error(`Error writing data: ${e.message}`)
    }
  }
  get (key) {
    return this.data[key]
  }
}

const db = new DB()

export default db
