import { getFileDB } from "./file-db";
import { getS3DB } from "./s3-db";

const {
  CLOUDCUBE_URL,
  CLOUDCUBE_ACCESS_KEY_ID,
  CLOUDCUBE_SECRET_ACCESS_KEY
} = process.env;

const useCloudCube =
  !!CLOUDCUBE_URL && !!CLOUDCUBE_ACCESS_KEY_ID && !!CLOUDCUBE_SECRET_ACCESS_KEY;

export const getDB = async <T>(name: string) => {
  if (useCloudCube) {
    return getS3DB<T>(
      name,
      CLOUDCUBE_URL!,
      CLOUDCUBE_ACCESS_KEY_ID!,
      CLOUDCUBE_SECRET_ACCESS_KEY!,
      "cloud-cube"
    );
  }
  return getFileDB<T>(name);
};
