/* eslint-disable max-len */

import { RegistryKeysEnum } from "../enum";
import { IBlogPostCronJobs, IBlogPostService } from "../interfaces";
import SkynedRegistry from "../registry";
import { blogPostService } from "../services";

/** Dependencies needed to instantiate class */
export interface IBlogPostCronJobsDependencies {
  /** BlogPost service */
  blogPostService: IBlogPostService;
}

/**
 * Concrete representation for IBlogPostCronJob
 * @class
 */
export class BlogPostCronJobs implements IBlogPostCronJobs {
  private static instance: IBlogPostCronJobs | null = null;

  private constructor(private readonly blogPostService: IBlogPostService) {}

  static factory({ blogPostService }: IBlogPostCronJobsDependencies) {
    if (!BlogPostCronJobs.instance) {
      BlogPostCronJobs.instance = new BlogPostCronJobs(blogPostService);
    }
    return BlogPostCronJobs.instance;
  }

  PublishPosts: IBlogPostCronJobs["PublishPosts"] = async () => {
    const blogPosts = await this.blogPostService.findAllPostsDueToPublish();

    if (blogPosts.length) {
      await this.blogPostService.publishPosts(blogPosts.map((post) => post.id));
    }
  };
}

/** concrete instance of {BlogPostCronJobs} */
export const blogPostCronJobs = SkynedRegistry.getSingleton(
  RegistryKeysEnum.BLOG_POST_CRON_JOB,
  () =>
    BlogPostCronJobs.factory({
      blogPostService,
    }),
);
