import {User} from "../../domain/entity/user.model";

export class Access extends User {

  private _expires_in: number;
  private _date_to_expire: string;
  private _integrator: any; // TODO
  private _scope: any;
  private _token_type: any;
  private _access_token: string;

  /**
   *
   * @param access
   */
  public constructor(access?: Access) {
    if (access) {
      super(access.id);
      this.refresh_token = access.refresh_token;
      this.access_token = access.access_token;
      this.expires_in = access.expires_in;
      this.date_to_expire = (new Date().getTime() + (this.expires_in * 1000));
      this.integrator = access.integrator;
      this.scope = access.scope;
      this.token_type = access.token_type;
      this.name = access.name;
      this.id = access.id;
    }
  }

  get date_to_expire(): any {
    if (this._date_to_expire)
      return this._date_to_expire;
    return localStorage.getItem('date_to_expire');
  }

  set date_to_expire(value: any) {
    this._date_to_expire = value;
    localStorage.setItem('date_to_expire', value);
  }

  get refresh_token(): string {
    const refresh_token = localStorage.getItem('refresh_token');

    if (refresh_token && refresh_token !== "null")
      return refresh_token;
    return null;
  }

  set refresh_token(value: string) {
    localStorage.setItem('refresh_token', value);
  }

  get access_token(): string {
    return this._access_token;
  }

  set access_token(value: string) {
    this._access_token = value;
  }

  get expires_in(): number {
    return this._expires_in;
  }

  set expires_in(value: number) {
    this._expires_in = value;
  }

  get integrator(): any {
    return this._integrator;
  }

  set integrator(value: any) {
    this._integrator = value;
  }

  get scope(): any {
    return this._scope;
  }

  set scope(value: any) {
    this._scope = value;
  }

  get token_type(): any {
    return this._token_type;
  }

  set token_type(value: any) {
    this._token_type = value;
  }

  get isInvalidAccessToken(): boolean {
    console.log('_date_to_expire', new Date(this._date_to_expire));
    return Access.isDateBeforeToday(new Date(this._date_to_expire))
  }

  private static isDateBeforeToday(date: Date): boolean {
    return date < new Date();
  }
}
