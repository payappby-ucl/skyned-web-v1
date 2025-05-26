import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { IAccommodation } from "@workspace/shared";
import { House } from "lucide-react";
import AccommodationForm from "../_components/accommodation-form";
import SchoolLocation from "../../_components/location";
import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";

export default async function SchoolAccommodation({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { data: accommodation } =
      await brandServerApi.httpClient.request<IAccommodation>(
        `/schools/${slug}/accommodation`,
        "GET",
        {
          next: {
            tags: [
              `${serverCacheTags.accommodations}`,
              `${serverCacheTags.schools}-slug-${slug}-accommodation`,
            ],
          },
        },
      );

    return accommodation ? (
      <HasPermission
        resourceName="accommodations"
        action="read"
        args={[accommodation]}
      >
        {accommodation.school ? (
          <div className="space-y-2">
            <Image
              src={accommodation.school.schoolImage.url || ""}
              width={200}
              height={200}
              alt={`${accommodation.school.name}'s cover image`}
              className="h-[250px] w-full rounded-sm object-cover"
            />
            <div className="space-y-2 border-b pb-3">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {accommodation.school.name[0]}
                  </AvatarFallback>
                  <AvatarImage
                    src={accommodation.school.logo.url}
                    className="size-8 object-cover"
                  />
                </Avatar>

                <h1 className="!text-2xl">{accommodation.school.name}</h1>
              </div>
              <SchoolLocation school={accommodation.school} />
            </div>
          </div>
        ) : null}

        <div className="space-y-5 pt-5">
          <div
            dangerouslySetInnerHTML={{ __html: accommodation.description }}
            className="wysiwyg-view"
          />

          <AccommodationForm slug={slug} accommodation={accommodation} />
        </div>
      </HasPermission>
    ) : (
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-center">
          <Alert message="No Accommodation" Icon={House} />
          <AccommodationForm slug={slug} />
        </div>
      </div>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
