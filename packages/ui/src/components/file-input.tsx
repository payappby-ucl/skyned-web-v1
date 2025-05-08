"use client";

import { Upload } from "lucide-react";
import React from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Button } from "./button.js";

interface Props {
  isInvalid: boolean;
  /** Any extra message you want displayed */
  message?: string;
  /** https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker */
  accept: DropzoneOptions["accept"];
  /** Accepted extensions */
  extensions: string[];
  disabled?: boolean;
  /** if accepting multiple files, what's the maximum number of files to accept */
  maxFiles?: number;
  /** Should accept multiple files */
  multiple?: boolean;
  /** Maximum file size in MB. Defaults to 2MB */
  maxSize?: number;
  /** Send error message to parent component */
  setError?: (message: string) => void;
  /** Clear any error coming from input child */
  clearError?: () => void;
  /** sends the file to the parent component */
  handleFile(file: File | undefined): void;
}
const FileInput: React.FC<Props> = ({
  isInvalid,
  accept,
  disabled = false,
  maxFiles = 0,
  multiple = false,
  maxSize = 2,
  extensions,
  message,
  handleFile,
  setError,
  clearError,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted(acceptedFiles) {
      if (!multiple) {
        const file = acceptedFiles[0];
        handleFile(file);
      } else {
        // TODO: Handle multiple files
        // ? This is not implemented because we don't have a use for it at the moment
        // ? So we just handling the very first file
        const file = acceptedFiles[0];
        handleFile(file);
      }

      clearError?.();
    },
    onDropRejected(fileRejections) {
      if (fileRejections && setError) {
        const code = fileRejections[0]?.errors[0]?.code;
        let message = fileRejections[0]?.errors[0]?.message || "";

        if (code === "file-too-large") {
          message = `File larger then ${maxSize}MB`;
        }

        setError(message);
      }
    },
    accept,
    disabled,
    maxFiles,
    multiple,
    maxSize: maxSize * 1024 * 1024,
  });

  return (
    <div
      {...getRootProps({
        className: `border-2 rounded-lg text-muted-foreground text-sm px-5 py-8 border-dashed grid place-items-center gap-1 ${isInvalid ? "border-destructive" : ""} ${isDragActive ? "border-ring ring-ring/50 ring-[3px]" : ""}`,
      })}
    >
      <Upload size={20} className="text-brand" />
      <input {...getInputProps()} />

      <div className="grid place-items-center">
        <div className="flex items-center gap-1">
          <p>Drag & Drop or </p>
          <Button
            type="button"
            variant="ghost"
            className="!p-0 !m-0 hover:bg-transparent hover:text-brand text-brand text-sm"
          >
            Choose file
          </Button>
          <p>to upload</p>
        </div>
        <p className="text-xs">
          <span className="font-bold">Formats:</span> {extensions.join(", ")}
        </p>
        <p className="text-xs">
          <span className="font-bold">Max Size:</span> {maxSize} MB
        </p>
        {message ? <p className="text-xs">{message}</p> : null}
      </div>
    </div>
  );
};

export { FileInput };
