export interface IFile {
    getDataUriFromFile(file: File): Promise<string>;
    saveFile(blob: Blob, name: string): void;
}
