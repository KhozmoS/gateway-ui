import { httpClient } from "./http-service";
export const gatewayService = {
  listGateways() {
    return httpClient.get("/gateway");
  },
  postGateway(gateway) {
    return httpClient.post("/gateway", gateway);
  },
  getDevices(gateway) {
    return httpClient.get(`/gateway/${gateway}/devices`);
  },
  assignDevices(gateway, devices) {
    return httpClient.post("/gateway/assign-devices", { GatewaySerial: gateway, DevicesIds: devices });
  }
}