
import { Role, Action } from '../types/roles';



export const permissions: Record<Role, Action[]> = {
    [Role.Admin]: [
        Action.CreateUser,
        Action.UpdateUser,
        Action.DeleteUser,
        Action.CreateMaterial,
        Action.UpdateMaterial,
        Action.DeleteMaterial,
        Action.GetAllMaterials,

        Action.createTile,
        Action.updateTile,
        Action.deleteTile,
        Action.createTerrain,
        Action.updateTerrain,
        Action.deleteTerrain,
        Action.createShape,
        Action.updateShape,
        Action.deleteShape
    ],
    [Role.User]: [
        Action.CreatePersonalUser,
        Action.UpdatePersonalUser,
        Action.DeletePersonalUser
    ],
};


