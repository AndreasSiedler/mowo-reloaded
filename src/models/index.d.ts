import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type ProductMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CityMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SpaceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Product {
  readonly id: string;
  readonly title?: string;
  readonly city?: City;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Product, ProductMetaData>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product, ProductMetaData>) => MutableModel<Product, ProductMetaData> | void): Product;
}

export declare class City {
  readonly id: string;
  readonly title: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<City, CityMetaData>);
  static copyOf(source: City, mutator: (draft: MutableModel<City, CityMetaData>) => MutableModel<City, CityMetaData> | void): City;
}

export declare class Space {
  readonly id: string;
  readonly title?: string;
  readonly city?: City;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Space, SpaceMetaData>);
  static copyOf(source: Space, mutator: (draft: MutableModel<Space, SpaceMetaData>) => MutableModel<Space, SpaceMetaData> | void): Space;
}