/** Storage infrastructure interface */
export interface IStorage {
  /** creates / stores file to cloud storage */
  put(data: {
    buffer: Buffer;
    path: string;
    mimeType: string;
    metadata?: Partial<{
      cacheControl: string;
      metadata: Record<string, any>;
    }>;
  }): Promise<{
    url: string;
    path: string;
    mimeType: string;
  }>;

  /** Deletes a file from cloud storage */
  delete(path: string): Promise<void>;
}
