export class LandsatDto {
  constructor(mapId: string, token: string, url: string) {
    this.mapId = mapId;
    this.token = token;
    this.url = url;
  }
  mapId: string;
  token: string;
  url: string;
}
