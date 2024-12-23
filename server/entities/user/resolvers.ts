import { Resolvers } from '../../types/resolver-types';

const resolvers: Resolvers = {
  Query: {
    me: (root, args, context) => {
      return {
        id: '2',
      };
    },
  },
};

export default resolvers;
