export class AuthEntity {
  accessToken: string;

  constructor(token: { accessToken: string }) {
    this.accessToken = token.accessToken;
  }
}
