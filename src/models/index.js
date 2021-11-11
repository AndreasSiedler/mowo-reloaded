// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, City } = initSchema(schema);

export {
  Product,
  City
};