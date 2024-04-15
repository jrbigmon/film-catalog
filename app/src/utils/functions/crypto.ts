import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export class Crypto {
  public static genSaltSync(salt: number): string {
    try {
      return genSaltSync(salt);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  public static encrypt(value: string): string {
    try {
      const salt = this.genSaltSync(10);
      return hashSync(value, salt);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  public static compare(value: string, hash: string): boolean {
    try {
      return compareSync(value, hash);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
