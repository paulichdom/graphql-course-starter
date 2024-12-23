import 'graphql-import-node';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {
  resolvers as scalarResolvers,
  typeDefs as scalarTypeDefs,
} from './scalars/index';
import {
  resolvers as userResolvers,
  typeDefs as userTypeDefs,
} from './entities/user';
import {
  resolvers as jobResolvers,
  typeDefs as jobTypeDefs,
} from './entities/job';
import {
  resolvers as companyResolvers,
  typeDefs as companyTypeDefs,
} from './entities/company';

const schema = makeExecutableSchema({
  typeDefs: [
    userTypeDefs, 
    jobTypeDefs,
    companyTypeDefs, 
    scalarTypeDefs
  ],
  resolvers: [
    userResolvers, 
    jobResolvers, 
    companyResolvers, 
    scalarResolvers
  ],
});

export default schema;
