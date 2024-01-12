import { Roles, Gender } from '../users/user.type';

interface BuildUser {
  name: string;
  email: string;
  password: string;
  role: Roles;
  gender: Gender;
  address: string;
  branchId: string;
}

export default BuildUser;
