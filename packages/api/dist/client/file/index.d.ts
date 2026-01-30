import { IFile } from "./interface";
export * from "./interface";
export declare class FileService implements IFile {
    getBufferFromFile: IFile["getBufferFromFile"];
    getDataUriFromFile: IFile["getDataUriFromFile"];
    saveFile: IFile["saveFile"];
}
