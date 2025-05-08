"use client";

import { CommonSchema, socialMedia } from "@workspace/shared";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { FormButton } from "@workspace/ui/components/form-button";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useForm, z, zodResolver } from "@workspace/ui/lib/utils";
import { Plus } from "lucide-react";
import React, { useCallback, useState } from "react";

interface Props {
  append(data: object): void;
  socials: (keyof typeof socialMedia)[];
}

const schema = CommonSchema.shape.social;
type SchemaType = z.infer<typeof schema>;

const SocialForm: React.FC<Props> = ({ append, socials }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: socials[0],
      url: "",
    },
  });

  const name = form.watch("name");

  const onSubmit = useCallback((data: SchemaType) => {
    append(data);
    form.reset();
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="!text-base">Add Link</DialogTitle>
          <DialogDescription>Add {name} profile link</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Media</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full capitalize">
                        <SelectValue placeholder="Select social media" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {socials.map((social) => (
                        <SelectItem
                          key={social}
                          value={social}
                          className="capitalize"
                        >
                          {social}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="url">Link</FormLabel>
                  <FormControl>
                    <Input
                      id="url"
                      {...field}
                      placeholder="https://x.com/SkynedC"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormButton
              type="button"
              onClick={() => form.handleSubmit(onSubmit)()}
              variant="brand"
            >
              Add
            </FormButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SocialForm;
