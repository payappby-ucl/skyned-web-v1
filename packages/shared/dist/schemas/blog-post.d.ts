import { z } from "zod";
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
