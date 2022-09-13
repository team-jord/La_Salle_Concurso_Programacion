import httpClient from "./HttpClient";
const prefix = "/categoria";

export default class CategoriaService {
  static async create(categoria) {
    return (await httpClient.post(`${prefix}/`, categoria)).data;
  }

  static async update(categoria) {
    return (await httpClient.put(`${prefix}/${categoria.id}`, categoria)).data;
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
