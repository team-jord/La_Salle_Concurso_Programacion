import httpClient from "./HttpClient";
const prefix = "/noticia";

export default class NoticiaService {
  static async create(noticia) {
    return (await httpClient.post(`${prefix}/`, noticia)).data;
  }

  static async update(noticia) {
    return (await httpClient.put(`${prefix}/${noticia.id}`, noticia)).data;
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
