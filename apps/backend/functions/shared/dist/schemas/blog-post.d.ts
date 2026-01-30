import { z } from "zod";
export declare const BlogSchema: z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodEffects<z.ZodString, string, string>;
    coverImage: z.ZodEffects<z.ZodString, string, string>;
    excerpt: z.ZodString;
    content: z.ZodEffects<z.ZodString, string, string>;
    featured: z.ZodDefault<z.ZodBoolean>;
    status: z.ZodEnum<["draft", "scheduled", "published", "unpublished"]>;
    publishedAt: z.ZodOptional<z.ZodNumber>;
    categories: z.ZodArray<z.ZodString, "many">;
    tags: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "scheduled" | "published" | "unpublished";
    slug: string;
    title: string;
    coverImage: string;
    excerpt: string;
    content: string;
    featured: boolean;
    categories: string[];
    tags: string[];
    publishedAt?: number | undefined;
}, {
    status: "draft" | "scheduled" | "published" | "unpublished";
    slug: string;
    title: string;
    coverImage: string;
    excerpt: string;
    content: string;
    categories: string[];
    tags: string[];
    featured?: boolean | undefined;
    publishedAt?: number | undefined;
}>;
export declare const BlogPostSchema: z.ZodEffects<z.ZodObject<{
    title: z.ZodString;
    slug: z.ZodEffects<z.ZodString, string, string>;
    coverImage: z.ZodEffects<z.ZodString, string, string>;
    excerpt: z.ZodString;
    content: z.ZodEffects<z.ZodString, string, string>;
    featured: z.ZodDefault<z.ZodBoolean>;
    status: z.ZodEnum<["draft", "scheduled", "published", "unpublished"]>;
    publishedAt: z.ZodOptional<z.ZodNumber>;
    categories: z.ZodArray<z.ZodString, "many">;
    tags: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "scheduled" | "published" | "unpublished";
    slug: string;
    title: string;
    coverImage: string;
    excerpt: string;
    content: string;
    featured: boolean;
    categories: string[];
    tags: string[];
    publishedAt?: number | undefined;
}, {
    status: "draft" | "scheduled" | "published" | "unpublished";
    slug: string;
    title: string;
    coverImage: string;
    excerpt: string;
    content: string;
    categories: string[];
    tags: string[];
    featured?: boolean | undefined;
    publishedAt?: number | undefined;
}>, {
    status: "draft" | "scheduled" | "published" | "unpublished";
    slug: string;
    title: string;
    coverImage: string;
    excerpt: string;
    content: string;
    featured: boolean;
    categories: string[];
    tags: string[];
    publishedAt?: number | undefined;
}, {
    status: "draft" | "scheduled" | "published" | "unpublished";
    slug: string;
    title: string;
    coverImage: string;
    excerpt: string;
    content: string;
    categories: string[];
    tags: string[];
    featured?: boolean | undefined;
    publishedAt?: number | undefined;
}>;
export type BlogPostSchema = z.infer<typeof BlogPostSchema>;
export declare const UpdateBlogPostSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["draft", "scheduled", "published", "unpublished"]>>;
    slug: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    title: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    featured: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    publishedAt: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    categories: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
} & {
    coverImage: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
}, "strip", z.ZodTypeAny, {
    status?: "draft" | "scheduled" | "published" | "unpublished" | undefined;
    slug?: string | undefined;
    title?: string | undefined;
    coverImage?: string | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    featured?: boolean | undefined;
    publishedAt?: number | undefined;
    categories?: string[] | undefined;
    tags?: string[] | undefined;
}, {
    status?: "draft" | "scheduled" | "published" | "unpublished" | undefined;
    slug?: string | undefined;
    title?: string | undefined;
    coverImage?: string | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    featured?: boolean | undefined;
    publishedAt?: number | undefined;
    categories?: string[] | undefined;
    tags?: string[] | undefined;
}>;
export type UpdateBlogPostSchema = z.infer<typeof UpdateBlogPostSchema>;
