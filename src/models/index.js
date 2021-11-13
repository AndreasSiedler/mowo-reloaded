// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, City, Space } = initSchema(schema);

export {
  Product,
  City,
  Space
};