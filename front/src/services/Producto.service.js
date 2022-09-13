import httpClient from "./HttpClient";
const prefix = "/producto";

export default class ProductoService {
  static async create(producto) {
    return (await httpClient.post(`${prefix}/`, producto)).data;
  }

  static async update(producto) {
    return (await httpClient.put(`${prefix}/${producto.id}`, producto)).data;
  }

  static async remove(id) {
    return (await httpClient.delete(`${prefix}/${id}`)).data;
  }

  static async getById(id) {
    return (await httpClient.get(`${prefix}/${id}`)).data;
  }

  static async getAll() {
    return (await httpClient.get(`${prefix}/`)).data;
  }

  static async list(limit, offset) {
    return (await httpClient.get(`${prefix}/${limit}/${offset}`)).data;
  }
}
