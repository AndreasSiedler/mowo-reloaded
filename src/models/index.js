// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Space, City, Image } = initSchema(schema);

export {
  Space,
  City,
  Image
};