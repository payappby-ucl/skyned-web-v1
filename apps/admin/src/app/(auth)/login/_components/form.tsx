"use client";

import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import React, { useCallback } from "react";
import { AdminLoginSchema } from "./schema";
import { brandClientApi } from "@/src/lib/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { PasswordInput } from "@workspace/ui/components/password-input";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<AdminLoginSchema>({
    resolver: zodResolver(AdminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(async (data: AdminLoginSchema) => {
    try {
      await brandClientApi.auth.login(data.email, data.password);
      router.replace("/");
    } catch (error) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl space-y-8 rounded-md border p-10"
      >
        <div className="space-y-2 text-center">
          <h1 className="!text-xl">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email below to login to your account.
          </p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  {...field}
                  placeholder="johndoe@skynedconsults.com"
                />
              </FormControl>
              <FormDescription className="text-xs">
                Only work emails allowed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  href="/forgot-password"
                  aria-label="Reset password page"
                  className="text-xs font-medium"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput id="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="brand"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Please wait..." : "Login"}
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
