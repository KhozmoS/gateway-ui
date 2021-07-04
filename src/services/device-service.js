import { httpClient } from "./http-service";
export const deviceService = {
  listDevices() {
    return httpClient.get("/device");
  }
}