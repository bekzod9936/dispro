import { useEffect } from "react";
import { useMutation } from "react-query";
import { useSetRecoilState, useRecoilValue } from "recoil";
//atoms
import { permissionList, setPermissions } from "services/atoms/permissions";
//selectors
import { getPermission } from "services/queries/staffQuery";

const usePermimssions = () => {
  const setPermission = useSetRecoilState(setPermissions);
  const { permissions: permitList } = useRecoilValue(permissionList);

  const staffId = localStorage.getItem("staffId");

  const permissions = useMutation((data: any) => getPermission(data), {
    onSuccess: (data) => {
      const permitData = data.data.data.permissions;

      setPermission({ permissions: permitData });
      console.log(permitData, "permit data");
    },
    onError: (e) => {
      console.log(e, "error");
    },
  });

  useEffect(() => {
    if (staffId) {
      permissions.mutate(staffId);
    }
  }, []);
  return {};
};

export default usePermimssions;
