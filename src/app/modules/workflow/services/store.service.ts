import {Injectable} from "@angular/core";
import {LocationStrategy} from "@angular/common";
import {Metadata} from "../models/store/metadata";

@Injectable()
export class Store {
  constructor(
    private location: LocationStrategy
  ){ }

  getMetadata(key: string){
    const metadata = sessionStorage.getItem(key);

    if(metadata)
      return Metadata.deSerialize(metadata);

    return null;
  }

  setMetadata(key: string, metadata: Metadata){
    sessionStorage.setItem(key, metadata.serialize());
  }
}
