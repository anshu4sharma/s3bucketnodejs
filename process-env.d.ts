declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      AccessKeyId: string;
      SecretAccessKey: string;
      SecretAccessKey: string;
      BUCKET_NAME: string;
      // add more environment variables and their types here
    }
  }
}
