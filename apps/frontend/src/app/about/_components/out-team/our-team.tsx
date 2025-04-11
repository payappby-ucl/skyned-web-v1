import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import TeamMember from "./team-member";

interface Props {
  teams: {
    firstName: string;
    lastName: string;
    imageUrl: string;
    title: string;
  }[];
}
export default async function OurTeam({ teams }: Props) {
  const top = Array.of(teams[0], teams[1], teams[2]) as typeof teams;

  return (
    <section className="!p-0">
      <section className="flex flex-col items-center justify-center gap-3">
        <h2 className="flex items-center">
          Meet the{" "}
          <span className="relative left-3 flex items-center">
            {top.map((team, i) => (
              <Avatar
                key={team.firstName}
                className={`border-background relative border-2`}
                style={{
                  left: i > 0 ? i * -10 : 0,
                }}
              >
                <AvatarImage src={team.imageUrl} />
                <AvatarFallback className="uppercase">
                  {team.firstName[0]}
                  {team.lastName[0]}
                </AvatarFallback>
              </Avatar>
            ))}
          </span>{" "}
          <span className="text-brand">Team</span>
        </h2>
        <p>Get to know passionate people behind our success</p>
      </section>
      <section className="bg-accent grid grid-cols-1 gap-5 !pt-6 md:grid-cols-3 lg:grid-cols-5">
        {teams.map((team) => (
          <TeamMember {...team} key={team.firstName} />
        ))}
      </section>
    </section>
  );
}
