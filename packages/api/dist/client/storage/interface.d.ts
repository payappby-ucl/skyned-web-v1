export interface ILocalStorage {
    setItem(name: string, value: string): void;
    getItem(name: string): string | null;
    deleteItem(name: string): void;
}
export interface IStorage {
    localStorage: ILocalStorage;
}
