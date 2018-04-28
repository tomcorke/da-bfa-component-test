import path from 'path'
import fs from 'fs-extra'

require('dotenv-safe').config()

export class DB {
  constructor (name) {
    this.filePath = path.join(__dirname, `../../db/${name}.json`)
    this.init()
  }

  init () {
    try {
      if (this.filePath) {
        fs.ensureFileSync(this.filePath)
        const rawData = fs.readFileSync(this.filePath, 'utf8')
        this.data = JSON.parse(rawData)
      } else {
        this.data = {}
      }
    } catch (e) {
      console.error(`Error loading data: ${e.message}`)
      this.data = {}
    }
  }

  set (key, data) {
    this.data[key] = data
    try {
      if (this.filePath) {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8')
      }
    } catch (e) {
      console.error(`Error writing data: ${e.message}`)
    }
  }

  get (key) {
    return this.data[key]
  }
}
