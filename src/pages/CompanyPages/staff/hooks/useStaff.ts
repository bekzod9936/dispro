import { useState } from "react";
import { useQuery } from "react-query";

//helpers
import { getBranches } from "services/queries/staffQuery";

const useStaff = () => {
  const [branches, setBranches] = useState<any>([]);

  //fetch branches
  useQuery(
    ["branchesStore"],
    () => {
      return getBranches();
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setBranches(
          data.data.data.map((v: any) => {
            return { value: v.id, label: v.name };
          })
        );
      },
    }
  );

  return {
    branches,
  };
};

export default useStaff;
