import httpClient from "./HttpClient";
const prefix = "/pagos";

export default class PaypalService {
  static async generarOrden(informacionOrden) {
    return (await httpClient.post(`${prefix}/creando-orden`, informacionOrden))
      .data;
  }
}
