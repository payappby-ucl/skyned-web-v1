/** ID Generator service interface */
export interface IIDGeneratorService {
  /** Uppercase Alphabets */
  uppercaseAlphabets: string;
  /** Lowercase Alphabets */
  lowercaseAlphabets: string;
  /** numbers */
  numbers: string;
  /** Generate using only alphabets */
  alphabets(size?: number): string;
  /** Generate using only alphabets uppercase */
  alphabetsUpper(size?: number): string;
  /** Generate using only alphabets lowercase */
  alphabetsLower(size?: number): string;
  /** Generate using only numbers */
  numeric(size?: number): string;
  /** Generate using only numbers and alphabets */
  alphanumeric(size?: number): string;
  /** Generate using custom string provided by you */
  custom(customString: string, size?: number): string;
  /** Generates using random characters */
  id(size?: number): string;
}
