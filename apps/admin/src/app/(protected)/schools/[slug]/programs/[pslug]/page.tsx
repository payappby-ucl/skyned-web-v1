import Alert from "@/src/components/alert";
import HasPermission from "@/src/components/has-permission";
import { brandServerApi } from "@/src/lib/server";
import { serverCacheTags } from "@/src/utils";
import { EnglishProficiency, IProgram } from "@workspace/shared";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import {
  Award,
  Banknote,
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  HandCoins,
  Speech,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import SchoolLocation from "../../../_components/location";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { Separator } from "@workspace/ui/components/separator";
import EducationLevel from "../_components/education-level";
import EnglishProficiencyDetails from "../_components/english-proficiency";
import Fee from "../_components/fee";
import ProgramIntakes from "../_components/intakes";
import FormatDate from "@/src/components/format-date";
import ProgramOptions from "./_components/program-options";
import Image from "next/image";
import { ProficiencyDisplay } from "@workspace/ui/components/proficiency-display";

export default async function SchoolProgramPage({
  params,
}: {
  params: Promise<{ slug: string; pslug: string }>;
}) {
  try {
    const { slug, pslug } = await params;
    const { data: program } = await brandServerApi.httpClient.request<IProgram>(
      `/schools/${slug}/programs/${pslug}`,
      "GET",
      {
        next: {
          tags: [
            `${serverCacheTags.schools}-${slug}-${serverCacheTags.programs}-${pslug}`,
          ],
        },
      },
    );

    if (!program) {
      redirect("/");
    }

    return (
      <HasPermission
        resourceName="programs"
        action="read"
        args={[program]}
        redirect
      >
        <div className="space-y-5">
          <div className="relative mb-10 md:hidden">
            <Image
              src={program.school?.schoolImage.url || ""}
              width={200}
              height={200}
              alt={`${program.school?.name}'s view image`}
              className="w-full"
            />

            <Avatar className="absolute -bottom-10 left-1/2 h-20 w-20 -translate-x-1/2 transform border md:block">
              <AvatarImage
                src={program.school?.logo.url}
                alt={`${program.school?.name}'s logo`}
              />
              <AvatarFallback>
                {program.school?.name[0]?.toLowerCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-center gap-2 border-b pb-3">
            <Avatar className="hidden h-10 w-10 md:block">
              <AvatarImage
                src={program.school?.logo.url}
                alt={`${program.school?.name}'s logo`}
              />
              <AvatarFallback>
                {program.school?.name[0]?.toLowerCase()}
              </AvatarFallback>
            </Avatar>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h1 className="!text-xl">{program.name}</h1>
                <div className="hidden md:block">
                  <ProgramOptions program={program} />
                </div>
              </div>
              <div className="text-muted-foreground flex flex-col gap-3 text-sm md:flex-row md:flex-wrap md:items-center">
                <Link
                  href={`/schools/${program.school?.slug}`}
                  className="hover:text-brand flex items-center gap-2 underline"
                >
                  <GraduationCap className="size-4" /> {program.school?.name}
                </Link>
                <SchoolLocation school={program.school!} />
                <p className="flex items-center gap-1">
                  <FileText className="size-4" /> {120}
                </p>
                <p className="flex items-center gap-1">
                  <Clock className="size-4" /> Last Updated:{" "}
                  <FormatDate date={program.updatedAt} format="DD/MM/YYYY" />
                </p>
                <div className="md:hidden">
                  <ProgramOptions program={program} />
                </div>
              </div>
            </div>
          </div>
          {/* Main Body */}
          <div className="grid grid-cols-1 items-start gap-2 lg:grid-cols-3">
            <Tabs
              defaultValue="overview"
              className="w-full rounded-md border p-4 lg:col-span-2"
            >
              <div className="overflow-x-scroll">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  {program.requirements ? (
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  ) : null}
                  <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
                </TabsList>
              </div>
              <Separator />
              <TabsContent value="overview" className="text-md font-normal">
                {program.overview}
              </TabsContent>
              <TabsContent value="description">
                <div
                  className="wysiwyg-view"
                  dangerouslySetInnerHTML={{ __html: program.description }}
                />
              </TabsContent>
              {program.requirements ? (
                <TabsContent value="requirements">
                  <div
                    className="wysiwyg-view"
                    dangerouslySetInnerHTML={{ __html: program.requirements }}
                  />
                </TabsContent>
              ) : null}
              <TabsContent value="scholarships" className="text-md font-normal">
                Under Construction
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              {/* Details */}
              <div className="space-y-2 rounded-md border p-4">
                <h3 className="!text-xl">Cost and Duration</h3>
                <Separator />
                <div className="space-y-3">
                  {/* Degree Award */}
                  <div className="flex items-center gap-4">
                    <div className="bg-accent rounded-lg p-2">
                      <Award />
                    </div>
                    <div>
                      <p className="text-md font-semibold">
                        {program.degreeType as string}
                      </p>
                      <small className="text-muted-foreground">
                        Program Award
                      </small>
                    </div>
                  </div>

                  {/* Minimum Education Level */}
                  <div className="flex items-center gap-4">
                    <div className="bg-accent rounded-lg p-2">
                      <CalendarDays />
                    </div>
                    <div>
                      <p className="text-md font-semibold">
                        <EducationLevel
                          level={program.minimumEducationLevel}
                          degree={program.minimumEducationDegree}
                        />
                      </p>
                      <small className="text-muted-foreground">
                        Minimum Education Level
                      </small>
                    </div>
                  </div>

                  {/* Tuition Fee */}
                  <div className="flex items-center gap-4">
                    <div className="bg-accent rounded-lg p-2">
                      <Banknote />
                    </div>
                    <div>
                      <p className="text-md flex items-center font-semibold">
                        <Fee
                          currency={program.school?.currency!}
                          amount={program.tuitionFee}
                        />{" "}
                        ({(program.tuitionFeeType as string).replace("_", " ")})
                      </p>
                      <small className="text-muted-foreground">
                        Tuition Fee
                      </small>
                    </div>
                  </div>

                  {/* Application Fee */}
                  <div className="flex items-center gap-4">
                    <div className="bg-accent rounded-lg p-2">
                      <HandCoins />
                    </div>
                    <div>
                      <p className="text-md flex items-center font-semibold">
                        <Fee
                          currency={program.school?.currency!}
                          amount={program.applicationFee}
                        />
                      </p>
                      <small className="text-muted-foreground">
                        Application Fee
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proficiencies */}
              {program.proficiencies ? (
                <div className="space-y-2 rounded-md border p-4">
                  <h3 className="!text-xl">Minimum English Proficiency</h3>
                  <Separator />
                  <div className="space-y-3">
                    {program.proficiencies.map(({ test, score }) => {
                      const gcfe = EnglishProficiency.getCefr(test, score);
                      return (
                        <ProficiencyDisplay
                          key={test}
                          name={gcfe.name}
                          tags={gcfe.tags}
                          test={test}
                          score={score}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* Intakes */}
              <ProgramIntakes intakes={program.intakes} program={program} />
            </div>
          </div>
        </div>
      </HasPermission>
    );
  } catch (error) {
    console.log(error);
    return <Alert message="Error" />;
  }
}
