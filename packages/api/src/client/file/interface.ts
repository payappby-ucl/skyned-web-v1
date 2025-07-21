export interface IFile {
  getDataUriFromFile(file: File): Promise<string>;
  getBufferFromFile(file: File): Promise<Buffer>;

  saveFile(blob: Blob, name: string): void;
}
