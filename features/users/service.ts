import * as repo from './repo';
import { User, UserRole } from './types';

export const getUserByEmail = repo.getUserByEmail;
export const createUser = repo.createUser;
export const updateUser = repo.updateUser;
export const deleteUser = repo.deleteUser;
export const getUserById = repo.getUserById;
export const getAllUsers = repo.getAllUsers;
export const getUserCount = repo.getUserCount;
