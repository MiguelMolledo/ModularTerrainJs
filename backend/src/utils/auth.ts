import { Role, Action } from '../types/roles';
import { permissions } from '../config/permissions';



export function canExecute(role: Role, action: Action): boolean {
    return permissions[role].includes(action);
}