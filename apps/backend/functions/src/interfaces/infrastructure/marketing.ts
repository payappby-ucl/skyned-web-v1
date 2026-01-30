import axios from "axios";

/** Represents Marketing Interfacing */
export interface IMarketing {
  client: axios.AxiosInstance;
  /** Creates a contact in the marketing/campaign dashboard */
  createContact(data: {
    email: string;
    fields?: Record<string, any>;
  }): Promise<{ contactId: number | string }>;

  /** Represents a specific audience */
  addContactToAudience(data: {
    contactId: string | number;
    audienceId: string | number;
  }): Promise<void>;
}
