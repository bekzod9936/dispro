import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import {
  createCashier,
  getManagers,
  getRoleManager,
  searchManagers,
  setRoleManager,
  deleteSingleCashier,
  editStaff,
} from "services/queries/StaffQueries";
import { useAppDispatch, useAppSelector } from "services/redux/hooks";
import {
  setAllManager,
  setManagers,
  setOpenCash,
  setPermissions,
  setSelectedRole,
  setStepManager,
  setUserId,
  setSelectedManagers,
  setOpenEditManager,
} from "services/redux/Slices/staffs";
import { numberWith } from "services/utils";

const useManagers = ({ page, query, period }: any) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.staffs.userId);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [modified, setModified] = useState("1");

  //edit
  const editManager = useMutation((data: any) => editStaff(data), {
    onSuccess: () => {
      setOpenEdit(false);
      dispatch(setOpenEditManager(false));
      response.refetch();
    },
  });
  //delete
  const deleteManager = useMutation((data: any) => deleteSingleCashier(data), {
    onSuccess: () => {
      dispatch(setSelectedManagers([]));
      setOpen(false);
      response.refetch();
    },
  });

  //set role manager
  const saveRoleManager = useMutation((data: any) =>
    setRoleManager({ userId, permissions: data })
  );

  const response = useQuery(
    ["managersStaff", page, query, period],
    () => {
      if (query !== "") {
        return searchManagers(query);
      }
      const url = Object.keys(period)
        .map((e: string) => `${e}=${period[e]}&`)
        .join("");
      return getManagers(page, url);
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 5000,
      onSuccess: (data) => {
        dispatch(setManagers(data.data.data));

        dispatch(
          setAllManager(
            data?.data?.data?.map((manager: any) => {
              return {
                ...manager,
                firstName: manager?.firstName + " " + manager?.lastName,
                score: numberWith(manager?.addInfo?.avgRating, " "),
                avgCheque: numberWith(manager?.addInfo?.avgCheque, " "),
                clients: numberWith(manager?.addInfo?.countClient, " "),
                operations: numberWith(manager?.addInfo?.countOperation, " "),
                amountOperation: numberWith(
                  manager?.addInfo?.amountOperation,
                  " "
                ),
                countRefer: numberWith(manager?.addInfo?.countRefer, " "),
              };
            })
          )
        );
      },
    }
  );

  const createManager = useMutation((data: any) => createCashier(data), {
    onSuccess: (data) => {
      if (data.data.data.roleId === 3) {
        response.refetch();
      } else {
        response.refetch();
        dispatch(setStepManager(2));
        roleManager.mutate(data?.data?.data?.userId);
        dispatch(setUserId(data?.data?.data?.userId));
      }

      dispatch(setOpenCash(false));
    },
  });

  //get role manager id
  const roleManager = useMutation(
    (id: any) => {
      return getRoleManager(id);
    },
    {
      onSuccess: (data) => {
        console.log(data.data.data, "data backend");
        dispatch(setPermissions(data.data.data.permissions));
        dispatch(
          setSelectedRole(
            data.data.data?.permissions?.map((item: any) => {
              return {
                value: item,
              };
            })
          )
        );
      },
    }
  );

  return {
    response,
    saveRoleManager,
    modified,
    setModified,
    createManager,
    roleManager,
    deleteManager,
    open,
    setOpen,
    editManager,
    openEdit,
    setOpenEdit,
  };
};

export default useManagers;
