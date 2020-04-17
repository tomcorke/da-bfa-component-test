import * as AWS from "aws-sdk";

const throttle = require("lodash/throttle");

import { DB } from "./abstract-db";

function clone<T>(obj: T) {
  try {
    return JSON.parse(JSON.stringify(obj)) as T;
  } catch (e) {
    // This is fine
  }
}

class S3DB<T> extends DB<T> {
  public fileName: string;
  private s3Client: AWS.S3;
  private bucketName: string;

  constructor(
    name: string,
    endpoint: string,
    accessKeyId: string,
    secretAccessKey: string,
    bucketName: string
  ) {
    super(name);
    this.fileName = `${name}.json`;
    this.s3Client = new AWS.S3({
      accessKeyId,
      secretAccessKey,
      endpoint,
      s3BucketEndpoint: true
    });
    this.bucketName = bucketName;
    this.saveData = throttle(this.saveData, 1000);
  }

  public async init() {
    try {
      if (this.fileName) {
        await new Promise((resolve, reject) => {
          console.log("Fetching object from S3", this.fileName);
          this.s3Client.getObject(
            {
              Bucket: this.bucketName,
              Key: this.fileName
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }
              if (!data) {
                return reject(Error("No response data!"));
              }
              if (data.Body === undefined) {
                this.data = {};
                return resolve();
              }
              const rawData = data.Body.toString("utf8");
              this.data = JSON.parse(rawData);
              console.log(`Loaded data from "${this.fileName}"`);
              resolve();
            }
          );
        });
      }
    } catch (e) {
      console.error(`Error loading data from "${this.fileName}": ${e.message}`);
    }
  }

  public async saveData() {
    try {
      await new Promise((resolve, reject) => {
        console.log("Storing object in S3", this.fileName);
        const request = this.s3Client.putObject(
          {
            Bucket: this.bucketName,
            Key: this.fileName,
            Body: JSON.stringify(this.data, null, 2),
            ContentType: "application/json, charset=utf-8"
          },
          (err, data) => {
            if (err) {
              return reject(err);
            }
            return resolve(data);
          }
        );
      });
    } catch (e) {
      console.error(`Error writing data to "${this.fileName}": ${e.message}`);
    }
  }
}

export const getS3DB = async <T>(
  name: string,
  endpoint: string,
  accessKeyId: string,
  secretAccessKey: string,
  bucketName: string
) => {
  const db = new S3DB<T>(
    name,
    endpoint,
    accessKeyId,
    secretAccessKey,
    bucketName
  );
  await db.init();
  return db;
};
