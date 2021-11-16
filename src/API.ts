/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSpaceInput = {
  id?: string | null,
  title?: string | null,
  owner?: string | null,
  images?: Array< ImageInput | null > | null,
  _version?: number | null,
  spaceCityId?: string | null,
};

export type ImageInput = {
  key?: string | null,
};

export type ModelSpaceConditionInput = {
  title?: ModelStringInput | null,
  and?: Array< ModelSpaceConditionInput | null > | null,
  or?: Array< ModelSpaceConditionInput | null > | null,
  not?: ModelSpaceConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Space = {
  __typename: "Space",
  id: string,
  title?: string | null,
  owner?: string | null,
  images?:  Array<Image | null > | null,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  city?: City | null,
};

export type Image = {
  __typename: "Image",
  key?: string | null,
};

export type City = {
  __typename: "City",
  id: string,
  title: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateSpaceInput = {
  id: string,
  title?: string | null,
  owner?: string | null,
  images?: Array< ImageInput | null > | null,
  _version?: number | null,
  spaceCityId?: string | null,
};

export type DeleteSpaceInput = {
  id: string,
  _version?: number | null,
};

export type CreateCityInput = {
  id?: string | null,
  title: string,
  _version?: number | null,
};

export type ModelCityConditionInput = {
  title?: ModelStringInput | null,
  and?: Array< ModelCityConditionInput | null > | null,
  or?: Array< ModelCityConditionInput | null > | null,
  not?: ModelCityConditionInput | null,
};

export type UpdateCityInput = {
  id: string,
  title?: string | null,
  _version?: number | null,
};

export type DeleteCityInput = {
  id: string,
  _version?: number | null,
};

export type ModelSpaceFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelSpaceFilterInput | null > | null,
  or?: Array< ModelSpaceFilterInput | null > | null,
  not?: ModelSpaceFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSpaceConnection = {
  __typename: "ModelSpaceConnection",
  items?:  Array<Space | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelCityFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  and?: Array< ModelCityFilterInput | null > | null,
  or?: Array< ModelCityFilterInput | null > | null,
  not?: ModelCityFilterInput | null,
};

export type ModelCityConnection = {
  __typename: "ModelCityConnection",
  items?:  Array<City | null > | null,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreateSpaceMutationVariables = {
  input: CreateSpaceInput,
  condition?: ModelSpaceConditionInput | null,
};

export type CreateSpaceMutation = {
  createSpace?:  {
    __typename: "Space",
    id: string,
    title?: string | null,
    owner?: string | null,
    images?:  Array< {
      __typename: "Image",
      key?: string | null,
    } | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    city?:  {
      __typename: "City",
      id: string,
      title: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
  } | null,
};

export type UpdateSpaceMutationVariables = {
  input: UpdateSpaceInput,
  condition?: ModelSpaceConditionInput | null,
};

export type UpdateSpaceMutation = {
  updateSpace?:  {
    __typename: "Space",
    id: string,
    title?: string | null,
    owner?: string | null,
    images?:  Array< {
      __typename: "Image",
      key?: string | null,
    } | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    city?:  {
      __typename: "City",
      id: string,
      title: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
  } | null,
};

export type DeleteSpaceMutationVariables = {
  input: DeleteSpaceInput,
  condition?: ModelSpaceConditionInput | null,
};

export type DeleteSpaceMutation = {
  deleteSpace?:  {
    __typename: "Space",
    id: string,
    title?: string | null,
    owner?: string | null,
    images?:  Array< {
      __typename: "Image",
      key?: string | null,
    } | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    city?:  {
      __typename: "City",
      id: string,
      title: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
  } | null,
};

export type CreateCityMutationVariables = {
  input: CreateCityInput,
  condition?: ModelCityConditionInput | null,
};

export type CreateCityMutation = {
  createCity?:  {
    __typename: "City",
    id: string,
    title: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateCityMutationVariables = {
  input: UpdateCityInput,
  condition?: ModelCityConditionInput | null,
};

export type UpdateCityMutation = {
  updateCity?:  {
    __typename: "City",
    id: string,
    title: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteCityMutationVariables = {
  input: DeleteCityInput,
  condition?: ModelCityConditionInput | null,
};

export type DeleteCityMutation = {
  deleteCity?:  {
    __typename: "City",
    id: string,
    title: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetSpaceQueryVariables = {
  id: string,
};

export type GetSpaceQuery = {
  getSpace?:  {
    __typename: "Space",
    id: string,
    title?: string | null,
    owner?: string | null,
    images?:  Array< {
      __typename: "Image",
      key?: string | null,
    } | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    city?:  {
      __typename: "City",
      id: string,
      title: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
  } | null,
};

export type ListSpacesQueryVariables = {
  filter?: ModelSpaceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSpacesQuery = {
  listSpaces?:  {
    __typename: "ModelSpaceConnection",
    items?:  Array< {
      __typename: "Space",
      id: string,
      title?: string | null,
      owner?: string | null,
      images?:  Array< {
        __typename: "Image",
        key?: string | null,
      } | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      city?:  {
        __typename: "City",
        id: string,
        title: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSpacesQueryVariables = {
  filter?: ModelSpaceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSpacesQuery = {
  syncSpaces?:  {
    __typename: "ModelSpaceConnection",
    items?:  Array< {
      __typename: "Space",
      id: string,
      title?: string | null,
      owner?: string | null,
      images?:  Array< {
        __typename: "Image",
        key?: string | null,
      } | null > | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      city?:  {
        __typename: "City",
        id: string,
        title: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetCityQueryVariables = {
  id: string,
};

export type GetCityQuery = {
  getCity?:  {
    __typename: "City",
    id: string,
    title: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListCitysQueryVariables = {
  filter?: ModelCityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCitysQuery = {
  listCitys?:  {
    __typename: "ModelCityConnection",
    items?:  Array< {
      __typename: "City",
      id: string,
      title: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncCitiesQueryVariables = {
  filter?: ModelCityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncCitiesQuery = {
  syncCities?:  {
    __typename: "ModelCityConnection",
    items?:  Array< {
      __typename: "City",
      id: string,
      title: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateSpaceSubscription = {
  onCreateSpace?:  {
    __typename: "Space",
    id: string,
    title?: string | null,
    owner?: string | null,
    images?:  Array< {
      __typename: "Image",
      key?: string | null,
    } | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    city?:  {
      __typename: "City",
      id: string,
      title: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
  } | null,
};

export type OnUpdateSpaceSubscription = {
  onUpdateSpace?:  {
    __typename: "Space",
    id: string,
    title?: string | null,
    owner?: string | null,
    images?:  Array< {
      __typename: "Image",
      key?: string | null,
    } | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    city?:  {
      __typename: "City",
      id: string,
      title: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
  } | null,
};

export type OnDeleteSpaceSubscription = {
  onDeleteSpace?:  {
    __typename: "Space",
    id: string,
    title?: string | null,
    owner?: string | null,
    images?:  Array< {
      __typename: "Image",
      key?: string | null,
    } | null > | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    city?:  {
      __typename: "City",
      id: string,
      title: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
  } | null,
};

export type OnCreateCitySubscription = {
  onCreateCity?:  {
    __typename: "City",
    id: string,
    title: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateCitySubscription = {
  onUpdateCity?:  {
    __typename: "City",
    id: string,
    title: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteCitySubscription = {
  onDeleteCity?:  {
    __typename: "City",
    id: string,
    title: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
