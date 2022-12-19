import { User } from '~/shared/user.interface';

export interface Authentication {
  authenticated: boolean;
  principal?: Partial<User>;
  jwt?: string;
}
