import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { ISchool } from "@workspace/shared";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { redirect } from "next/navigation";
import SchoolLocation from "../_components/location";
import Image from "next/image";
import SchoolMenu from "./_components/school-menu";
import ProgramList from "./_components/program-list";

export default async function SchoolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;
    const { data: school } = await brandServerApi.httpClient.request<ISchool>(
      `/schools/${slug}`,
      "GET",
      {
        next: {
          tags: [`${serverCacheTags.schools}-slug-${slug}`],
        },
      },
    );

    if (!school) {
      redirect("/");
    }

    return (
      <HasPermission
        resourceName="schools"
        action="read"
        secondaryComponent={<Alert />}
        args={[school]}
        redirect
      >
        <div className="space-y-2">
          <Image
            src={school.schoolImage.url}
            width={200}
            height={200}
            alt={`${school.name}'s cover image`}
            className="h-[250px] w-full rounded-sm object-cover"
          />
          <div className="space-y-2 border-b pb-3">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{school.name[0]}</AvatarFallback>
                <AvatarImage
                  src={school.logo.url}
                  className="size-8 object-cover"
                />
              </Avatar>

              <div className="flex w-full items-center justify-between">
                <h1 className="!text-xl md:!text-2xl">{school.name}</h1>
                <div className="hidden md:block">
                  <SchoolMenu school={school} />
                </div>
              </div>
            </div>
            <p className="text-muted-foreground whitespace-pre-line text-sm">
              {school.overview}
            </p>
            <SchoolLocation school={school} />
            <div className="md:hidden">
              <SchoolMenu school={school} />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <HasPermission
            resourceName="programs"
            action="list"
            secondaryComponent={<Alert />}
            args={[]}
          >
            <ProgramList slug={slug} />
          </HasPermission>
        </div>
      </HasPermission>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
