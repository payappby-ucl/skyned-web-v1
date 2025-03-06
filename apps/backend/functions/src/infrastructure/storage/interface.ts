export interface IStorage {
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

  delete(path: string): Promise<void>;
}
