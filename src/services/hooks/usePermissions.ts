import { useAppSelector } from "services/redux/hooks";
import { permissionsSelector, permissionsType } from "services/redux/Slices/permissions";

export const usePermissions = (permission: keyof permissionsType) => {
    const permissions = useAppSelector(permissionsSelector);

    return permissions[permission].length === 0 ? null : permissions[permission][0] === 1 ? true : false
}