export interface IActionType<T> {
  type: "loaded";
  payload: Partial<T>;
}
