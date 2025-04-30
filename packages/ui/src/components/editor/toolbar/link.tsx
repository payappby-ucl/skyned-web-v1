"use client";
import {
  CornerDownLeft,
  Link,
  SquareArrowOutUpRight,
  Trash,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";
import { EditorToolbarProp } from "./index";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "../../form";
import { useCallback, useEffect, useState } from "react";
import { Input } from "../../input";
import { Button } from "../../button";
import { Separator } from "../../separator";

const LinkSchema = z.object({
  link: z.string().trim().url("Invalid url").nonempty("Required"),
});

type LinkSchema = z.infer<typeof LinkSchema>;

const LinkForm: React.FC<
  Pick<EditorToolbarProp, "editor"> & {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    url?: string;
  }
> = ({ editor, url, setOpen }) => {
  const form = useForm<LinkSchema>({
    resolver: zodResolver(LinkSchema),
    defaultValues: {
      link: url || "",
    },
    values: {
      link: url || "",
    },
  });

  const onSubmit = useCallback(
    (data: LinkSchema) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: data.link })
        .run();

      setOpen(false);
    },
    [editor, setOpen, url],
  );

  const removeLink = useCallback(() => {
    editor
      .chain()
      .focus()
      .unsetMark("link", { extendEmptyMarkRange: true })
      .setMeta("preventAutolink", true)
      .run();
  }, [editor.state]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-1"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }
        }}
      >
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="url"
                  placeholder="Paste a link..."
                  className="outline-none focus:outline-none border-none shadow-none focus:!border-none ring-0 focus:!ring-0 !bg-transparent"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  autoFocus
                />
              </FormControl>
            </FormItem>
          )}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={`!p-0 size-7 group`}
                type="button"
                disabled={!form.formState.isValid}
                onClick={() => form.handleSubmit(onSubmit)()}
              >
                <CornerDownLeft className="!w-3.5 !h-3.5 text-muted-foreground group-hover:text-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Apply Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Separator orientation="vertical" className="!h-[20px]" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                disabled={!form.formState.isValid}
                className={`!p-0 size-7 group`}
                onClick={() => window.open(form.getValues("link"), "_blank")}
              >
                <SquareArrowOutUpRight className="!w-3.5 !h-3.5 text-muted-foreground group-hover:text-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open in new window</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                disabled={!form.formState.isValid}
                className={`!p-0 size-7 group`}
                onClick={() => removeLink()}
              >
                <Trash className="!w-3.5 !h-3.5 text-muted-foreground group-hover:text-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </Form>
  );
};

const Links: React.FC<
  Pick<EditorToolbarProp, "editor"> & {
    setIsMobileLink: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = ({ editor, setIsMobileLink }) => {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const updateLinkState = () => {
      const { href } = editor.getAttributes("link");
      setUrl(href || "");
    };

    editor.on("selectionUpdate", updateLinkState);
    return () => {
      editor.off("selectionUpdate", updateLinkState);
    };
  }, [editor]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger type="button" asChild>
              <PopoverTrigger
                className={`hidden md:flex items-center justify-center hover:bg-muted rounded-lg !p-0 size-8 group disabled:opacity-50 ${editor.isActive("link") ? "bg-muted" : ""}`}
                disabled={!editor.can().setLink?.({ href: "" })}
              >
                <Link
                  className={`w-3.5 h-3.5 group-hover:text-foreground ${editor.isActive("link") ? "!text-brand-secondary" : "text-muted-foreground"}`}
                />
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent
          className="p-1 rounded-xl w-fit flex items-center"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <LinkForm editor={editor} url={url} setOpen={setOpen} />
        </PopoverContent>
      </Popover>

      <Button
        type="button"
        variant="ghost"
        className={`md:hidden !p-0 !size-8 rounded-lg group box-border ${editor.isActive("link") ? "bg-muted" : ""}`}
        disabled={!editor.can().setLink?.({ href: "" })}
        onClick={() => setIsMobileLink(true)}
      >
        <Link
          size={4}
          className={`text-muted-foreground group-hover:text-foreground ${editor.isActive("link") ? "!text-brand-secondary" : ""}`}
        />
      </Button>
    </>
  );
};
export { Links, LinkForm };
