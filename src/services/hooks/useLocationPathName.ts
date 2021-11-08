import { useEffect } from "react";
import { useAppDispatch } from "services/redux/hooks";
import { setCurrentPage } from "services/redux/Slices/partnerSlice";

const useLocationPathName = (pathName: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    let path = pathName
      .split("")
      .filter((item: any) => item !== "/")
      .join("");
    dispatch(setCurrentPage(path));
  }, []);
  return {};
};

export default useLocationPathName;
