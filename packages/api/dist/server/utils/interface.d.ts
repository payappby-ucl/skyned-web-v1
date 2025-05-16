export interface IServerUtils {
    createServerActionError(error: any): {
        success: false;
        message: string;
    };
    constructQuery(data: Record<string, string | null>): URLSearchParams;
    constructTags(data: Record<string, {
        prefix: string;
        value: string | null;
    }>, base: string[]): string[];
}
