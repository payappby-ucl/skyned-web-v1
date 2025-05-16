"use client";

import { brandClientApi } from "@/src/lib/client";
import {
  ContactUsSchema,
  DEFAULT_PHONE_NUMBER_COUNTRY_CODE,
} from "@workspace/shared";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { PhoneInput } from "@workspace/ui/components/phone-input";
import { Textarea } from "@workspace/ui/components/textarea";
import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import React, { useCallback } from "react";
import { sendContactUsMessage } from "../_actions";
import { FormButton } from "@workspace/ui/components/form-button";

const ContactUsForm: React.FC = () => {
  const form = useForm<ContactUsSchema>({
    resolver: zodResolver(ContactUsSchema),
    defaultValues: {
      email: "",
      name: "",
      message: "",
      subject: "",
      phoneNumber: DEFAULT_PHONE_NUMBER_COUNTRY_CODE,
    },
  });

  const onSubmit = useCallback(async (data: ContactUsSchema) => {
    try {
      const res = await sendContactUsMessage(data);
      const resData = brandClientApi.utils.handleServerActionResponse(res);
      brandClientApi.utils.toast.success(resData.message);
      form.reset();
    } catch (error: any) {
      brandClientApi.utils.alertError(error);
    }
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-background space-y-4 rounded-md p-5"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" id="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    id="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a subject"
                    id="subject"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="Enter your phone number"
                    id="phoneNumber"
                    defaultcountry="NG"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="message">Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Type your message"
                  id="message"
                  className="h-40"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton
          variant="brand"
          className="ml-auto block"
          isLoading={form.formState.isSubmitting}
        >
          Send Message
        </FormButton>
      </form>
    </Form>
  );
};

export default ContactUsForm;
