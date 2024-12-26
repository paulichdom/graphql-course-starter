import client from "../../client";
import { useCancelApplicationMutation } from "./queries.generated";

const useCancelApplication = () => {
  const [cancelApplication, {loading}] = useCancelApplicationMutation()
  return {
    cancelApplication: async (id: string) => {
      await cancelApplication({
        variables: {input: {id}},
        refetchQueries: ['Profile'],
        onCompleted: () => {
          client.cache.modify({
            id: `Job:${id}`,
            fields: {
              isApplied: () => false
            }
          })
        }
      })
    },
    isLoading: loading,
  };
};

export default useCancelApplication;
