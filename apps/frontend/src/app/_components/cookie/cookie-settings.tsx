"use client";

import { Button } from "@workspace/ui/components/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import Image from "next/image";
import logo from "../../../../public/assets/images/brand/logo.png";
import Link from "next/link";
import {
  ICookieConsent,
  useCookieConsentContext,
} from "@/src/components/providers/cookie-consent";
import { useCallback, useState } from "react";
import { useForm, zodResolver } from "@workspace/ui/lib/utils";
import { CookieConsentForm } from "./schema";
import {
  FormControl,
  FormField,
  FormItem,
  Form,
} from "@workspace/ui/components/form";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Switch } from "@workspace/ui/components/switch";

const consentSettingOptions: {
  title: string;
  description: string;
  required: boolean;
  name: keyof ICookieConsent;
}[] = [
  {
    title: "Strictly Necessary Cookies",
    description:
      "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.",
    required: true,
    name: "necessary",
  },
  {
    title: "Analytics Cookies",
    description:
      "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They allow us to measure and improve site performance and create a better user experience. Analytics cookies help us understand which pages are the most and least popular, track how visitors navigate the site, and determine if users encounter any error messages.",
    required: false,
    name: "analytics",
  },
  {
    title: "Functional Cookies",
    description:
      "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.",
    required: false,
    name: "functional",
  },
  {
    title: "Marketing Cookies",
    description:
      "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.",
    required: false,
    name: "marketing",
  },
];

interface Props {
  title: string;
  description: string;
  required: boolean;
  value: boolean;
  onChange: (...event: any[]) => void;
}
const SettingOption: React.FC<Props> = ({
  value,
  onChange,
  title,
  description,
  required,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      className="rounded-md border"
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex items-center justify-between gap-2 p-2">
        <CollapsibleTrigger className="flex-1">
          <div className="flex items-center gap-2">
            {open ? <MinusIcon size={15} /> : <PlusIcon size={15} />}
            <p className="text-sm font-semibold">{title}</p>
          </div>
        </CollapsibleTrigger>
        {required ? (
          <p className="text-brand text-sm font-bold">Always Active</p>
        ) : (
          <FormControl>
            <Switch checked={value} onCheckedChange={onChange} />
          </FormControl>
        )}
      </div>
      <CollapsibleContent className="bg-accent p-2 text-sm">
        <p>{description}</p>
      </CollapsibleContent>
    </Collapsible>
  );
};

const CookieSettings = () => {
  const { acceptAll, consent, saveConsent } = useCookieConsentContext();
  const [open, setOpen] = useState(false);

  const form = useForm<CookieConsentForm>({
    resolver: zodResolver(CookieConsentForm),
    defaultValues: consent,
  });

  const onSubmit = useCallback((data: CookieConsentForm) => {
    saveConsent(data);
    setOpen(false);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Cookie Settings</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="h-screen overflow-y-scroll">
          <div className="border-b p-5">
            <Image src={logo} alt="Skyned Consult's Logo" className="w-27" />
          </div>
          <SheetHeader>
            <SheetTitle className="!text-xl">
              Privacy Preference Center
            </SheetTitle>
            <SheetDescription className="text-sm">
              When you visit any website, it may store or retrieve information
              on your browser, mostly in the form of cookies. This information
              might be about you, your preferences or your device and is mostly
              used to make the site work as you expect it to. The information
              does not usually directly identify you, but it can give you a more
              personalized web experience. Because we respect your right to
              privacy, you can choose not to allow some types of cookies. Click
              on the different category headings to find out more and change our
              default settings. However, blocking some types of cookies may
              impact your experience of the site and the services we are able to
              offer.
              <br />
              <Button
                asChild
                variant="link"
                className="text-md p-0"
                role="button"
              >
                <Link
                  href="https://cookiepedia.co.uk/giving-consent-to-cookies"
                  target="_blank"
                  rel="noopener"
                  aria-label="More information about your privacy, opens in a new tab"
                >
                  More information
                </Link>
              </Button>
            </SheetDescription>
          </SheetHeader>
          <section className="mx-5">
            <Button
              variant="brand"
              className="w-full md:w-fit"
              aria-label="Accept All Cookies"
              onClick={acceptAll}
              role="button"
            >
              Accept All Cookies
            </Button>

            <div className="my-5">
              <h2 className="mb-4 !text-xl">Manage Consent Preferences</h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  {consentSettingOptions.map(
                    ({ title, description, required, name }) => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <SettingOption
                              title={title}
                              description={description}
                              required={required}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormItem>
                        )}
                      />
                    ),
                  )}
                  <Button
                    variant="brand"
                    type="submit"
                    className="w-full md:w-fit"
                  >
                    Confirm My Choices
                  </Button>
                </form>
              </Form>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CookieSettings;
