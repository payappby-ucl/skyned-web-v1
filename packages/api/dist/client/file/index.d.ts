import { IFile } from "./interface";
export * from "./interface";
export declare class FileService implements IFile {
    getDataUriFromFile: IFile["getDataUriFromFile"];
    saveFile: IFile["saveFile"];
}
