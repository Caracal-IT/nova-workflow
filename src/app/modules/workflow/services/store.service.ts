import {Injectable} from "@angular/core";
import {Metadata} from "../models/store/metadata";

@Injectable()
export class Store {
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
