import httpClient from "./HttpClient";
const prefix = "/s3";

export default class S3Service {
  static async upload(file) {
    let data = new FormData();
    data.append("foto", file);
    const result = (await httpClient.post(prefix, data)).data;
    return {
      result,
    };
  }

  static async get(key) {
    const result = (await httpClient.get(prefix + "/" + key)).data;

    return {
      result,
    };
  }

  static async delete(key) {
    const result = (await httpClient.delete(prefix + "/" + key)).data;

    return {
      result,
    };
  }
}
