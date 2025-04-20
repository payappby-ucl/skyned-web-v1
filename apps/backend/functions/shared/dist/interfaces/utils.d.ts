export interface IObject {
    url: string;
    path: string;
    mimeType: string;
}
export interface ITimestamps {
    createdAt: Date;
    updatedAt: Date;
}
export interface IPhoneNumber {
    number: string;
    countryCallingCode: string;
    nationalNumber: string;
    country?: string;
}
