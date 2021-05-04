import Role from '../../../models/Role';

class RegisterUserDto {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  avatarUrl?: string;
  role?: Role;
}

export default RegisterUserDto;
