import { User } from '~/shared/user.interface';

export interface Authentication {
  authenticated: boolean;
  currentUser?: Partial<User>;
  jwt?: string;
}
