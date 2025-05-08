export interface IFile {
  getDataUriFromFile(file: File): Promise<string>;
}
