import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './server/**/*.graphql',
  generates: {
    './server/types/resolver-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context#Context',
        defaulMapper: 'Partial<{T}>',
      },
    },
  },
};

export default config;