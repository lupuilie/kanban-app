import { User } from '../entities';

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | null>;
}
