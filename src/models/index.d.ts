import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Image {
  readonly key?: string;
  constructor(init: ModelInit<Image>);
}

type SpaceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CityMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Space {
  readonly id: string;
  readonly title?: string;
  readonly city?: City;
  readonly owner?: string;
  readonly images?: (Image | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Space, SpaceMetaData>);
  static copyOf(source: Space, mutator: (draft: MutableModel<Space, SpaceMetaData>) => MutableModel<Space, SpaceMetaData> | void): Space;
}

export declare class City {
  readonly id: string;
  readonly title: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<City, CityMetaData>);
  static copyOf(source: City, mutator: (draft: MutableModel<City, CityMetaData>) => MutableModel<City, CityMetaData> | void): City;
}