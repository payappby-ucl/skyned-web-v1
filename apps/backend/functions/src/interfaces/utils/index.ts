export * from "./validation";
export interface IQueryConstruct<T> {
  take: number;
  skip: number;
  order: {
    orderBy: keyof T;
    order: "asc" | "desc";
  };
  from: Date;
  to: Date;
  where: Partial<Record<keyof T, any>>;
}
