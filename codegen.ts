import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './server/**/*.graphql',
  generates: {
    './server/types/resolver-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context#Context',
        defaulMapper: 'Partial<{T}>',
        scalars: {
          DateTime: 'Date',
        },
        mappers: {
          Job: '@prisma/client#Job',
          JobType: '@prisma/client#JobType',
        },
      },
    },
  },
};

export default config;
