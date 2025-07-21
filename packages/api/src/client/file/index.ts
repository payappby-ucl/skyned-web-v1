import { saveAs } from "file-saver";
import { IFile } from "./interface";

export * from "./interface";

export class FileService implements IFile {
  getBufferFromFile: IFile["getBufferFromFile"] = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer;
  };

  getDataUriFromFile: IFile["getDataUriFromFile"] = async (file) => {
    const buffer = await this.getBufferFromFile(file);
    const base64 = buffer.toString("base64");
    const mimeType = file.type;

    const dataURI = `data:${mimeType};base64,${base64}`;

    return dataURI;
  };

  saveFile: IFile["saveFile"] = (blob, name) => {
    saveAs(blob, name);
  };
}
