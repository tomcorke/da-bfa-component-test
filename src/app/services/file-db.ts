import * as fs from "fs-extra";
import * as path from "path";

const throttle = require("lodash/throttle");

import { DB } from "./abstract-db";

function clone<T>(obj: T) {
  try {
    return JSON.parse(JSON.stringify(obj)) as T;
  } catch (e) {
    // This is fine
  }
}

class FileDB<T> extends DB<T> {
  public filePath: string;

  constructor(name: string) {
    super(name);
    this.filePath = path.join(__dirname, `../../../db/${name}.json`);
    this.saveData = throttle(this.saveData, 1000);
  }

  public async init() {
    try {
      if (this.filePath) {
        fs.ensureFileSync(this.filePath);
        const rawData = fs.readFileSync(this.filePath, "utf8");
        this.data = JSON.parse(rawData);
        console.log(`Loaded data from "${this.filePath}"`);
      }
    } catch (e) {
      console.error(`Error loading data from "${this.filePath}": ${e.message}`);
    }
  }

  public async saveData() {
    try {
      if (this.filePath) {
        fs.writeFileSync(
          this.filePath,
          JSON.stringify(this.data, null, 2),
          "utf8"
        );
      }
    } catch (e) {
      console.error(`Error writing data to "${this.filePath}": ${e.message}`);
    }
  }
}

export const getFileDB = async <T>(name: string) => {
  const db = new FileDB<T>(name);
  await db.init();
  return db;
};
