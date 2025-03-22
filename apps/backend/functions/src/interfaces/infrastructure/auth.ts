/** Auth Infrastructure interfaces */
export interface IAuth {
  findUserByEmail(email: string): Promise<{ id: string; email: string } | null>;
  exists(email: string): Promise<boolean>;
}
