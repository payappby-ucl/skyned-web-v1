/** Represents Blog post Cron Job */
export interface IBlogPostCronJobs {
  PublishPosts(): Promise<void>;
}
