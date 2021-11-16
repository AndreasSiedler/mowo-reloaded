/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSpace = /* GraphQL */ `
  query GetSpace($id: ID!) {
    getSpace(id: $id) {
      id
      title
      owner
      images {
        key
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      city {
        id
        title
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
    }
  }
`;
export const listSpaces = /* GraphQL */ `
  query ListSpaces(
    $filter: ModelSpaceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSpaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        owner
        images {
          key
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        city {
          id
          title
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSpaces = /* GraphQL */ `
  query SyncSpaces(
    $filter: ModelSpaceFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSpaces(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        owner
        images {
          key
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        city {
          id
          title
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
          owner
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getCity = /* GraphQL */ `
  query GetCity($id: ID!) {
    getCity(id: $id) {
      id
      title
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listCitys = /* GraphQL */ `
  query ListCitys(
    $filter: ModelCityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCities = /* GraphQL */ `
  query SyncCities(
    $filter: ModelCityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
