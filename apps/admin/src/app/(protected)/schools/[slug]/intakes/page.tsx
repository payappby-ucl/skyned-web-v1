import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { ISchool } from "@workspace/shared";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import SchoolLocation from "../../_components/location";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { redirect } from "next/navigation";
import IntakeList from "../_components/intake-list";

export default async function SchoolIntakes({
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
        args={[school]}
        redirect
      >
        <div className="space-y-2">
          <Image
            src={school.schoolImage.url || ""}
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

              <h1 className="!text-2xl">{school.name}</h1>
            </div>
            <SchoolLocation school={school} />
          </div>
          <HasPermission resourceName="intakes" action="list" args={[]}>
            <IntakeList slug={slug} />
          </HasPermission>
        </div>
      </HasPermission>
    );
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return <Alert message="Error" />;
  }
}
