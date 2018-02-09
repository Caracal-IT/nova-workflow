import {Injectable} from "@angular/core";
import {LocationStrategy} from "@angular/common";

@Injectable()
export class Store {
  constructor(
    private location: LocationStrategy
  ){ }

  getMetadata(key: string){
    const metadata = sessionStorage.getItem(key);
console.log("Store");
console.log(metadata);

    if(metadata)
      return Metadata.deSerialize(metadata);

    return null;
  }

  setMetadata(key: string, metadata: Metadata){
    sessionStorage.setItem(key, metadata.serialize());
  }
}

export class Metadata {
  constructor(
    public workflow: any,
    public activity: string,
    public model: string
  ) {}

  serialize(): string {
    return JSON.stringify(this);
  }

  static deSerialize(metadata: string): Metadata {
    return JSON.parse(metadata);
  }
}
