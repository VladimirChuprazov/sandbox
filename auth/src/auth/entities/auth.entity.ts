export class AuthEntity {
  accessToken: string;

  constructor(entity: { accessToken: string }) {
    this.accessToken = entity.accessToken;
  }
}
