import path from 'path'
import fs from 'fs-extra'

const clone = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj))
  } catch (e) {}
}

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
    this.data[key] = clone(data)
    try {
      if (this.filePath) {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf8')
      }
    } catch (e) {
      console.error(`Error writing data: ${e.message}`)
    }
  }

  get (key) {
    return clone(this.data[key])
  }

  getAll () {
    return clone(this.data)
  }

  delete (key) {
    this.data[key] = undefined
  }
}
