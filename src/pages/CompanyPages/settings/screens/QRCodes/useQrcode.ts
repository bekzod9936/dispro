import { useMutation, useQuery } from "react-query";
import {
  fetchQRCodes,
  fetchBranchesQrCode,
  putBranchesQuery,
  postRefQuery,
  refDeleteQrCode,
  refEditQrCode,
} from "services/queries/newSettingQueries";
import { useAppDispatch } from "services/redux/hooks";
import { setRefQrcodes, setBranchQrCodes } from "services/redux/Slices/setting";

const useQrcode = () => {
  const dispatch = useAppDispatch();

  const resRefQrCodes = useQuery("fetchQrcodes", fetchQRCodes, {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      dispatch(setRefQrcodes(data.data.data));
    },
  });

  const resBranchesQrCodes = useQuery(
    "fetchBranchesQrCode",
    fetchBranchesQrCode,
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        dispatch(setBranchQrCodes(data.data.data));
      },
    }
  );

  const putBranches = useMutation((data: any) => putBranchesQuery(data), {
    onSuccess: () => {
      resBranchesQrCodes.refetch();
    },
  });

  const postRef = useMutation((data: any) => postRefQuery(data), {
    onSuccess: () => {
      resRefQrCodes.refetch();
    },
  });

  const deleteRef = useMutation((data: any) => refDeleteQrCode(data), {
    onSuccess: () => {
      resRefQrCodes.refetch();
    },
  });

  const putRef = useMutation((data: any) => refEditQrCode(data), {
    onSuccess: () => {
      resRefQrCodes.refetch();
    },
  });

  return {
    resRefQrCodes,
    resBranchesQrCodes,
    putBranches,
    postRef,
    deleteRef,
    putRef,
  };
};

export default useQrcode;
