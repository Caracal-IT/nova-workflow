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
