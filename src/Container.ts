export class Container {
  private static _instance: Container;
  bindings: any = [];

  constructor() {
  }

  bind(abstract: string, concrete: any) {
    if (this.bindings[abstract] === undefined) {
      this.bindings[abstract] = concrete;
    }
  }

  resolve(abstract: string) {
    return this.bindings[abstract];
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
