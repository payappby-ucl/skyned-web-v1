import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import TeamMember from "./team-member";

const teams = [
  {
    firstName: "Richard",
    lastName: "Castillo",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    title: "CEO",
  },
  {
    firstName: "Jesse",
    lastName: "Frazier",
    imageUrl:
      "https://cdn.pixabay.com/photo/2021/11/05/12/25/woman-6771278_1280.jpg",
    title: "COO",
  },
  {
    firstName: "Lela",
    lastName: "Swanson",
    imageUrl:
      "https://cdn.pixabay.com/photo/2019/02/11/20/20/woman-3990680_1280.jpg",
    title: "HOO",
  },
  {
    firstName: "Josie",
    lastName: "Bass",
    imageUrl:
      "https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_1280.jpg",
    title: "Tech Lead",
  },
  {
    firstName: "Bruce",
    lastName: "Roberson",
    imageUrl:
      "https://cdn.pixabay.com/photo/2022/11/20/15/47/portrait-7604619_1280.jpg",
    title: "Marketing Lead",
  },
  {
    firstName: "Gordon",
    lastName: "George",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/05/13/12/20/face-1389833_1280.jpg",
    title: "Team Member",
  },
  {
    firstName: "Verna",
    lastName: "Roy",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/21/12/40/woman-1845148_1280.jpg",
    title: "Team Member",
  },
  {
    firstName: "Alan",
    lastName: "Walters",
    imageUrl:
      "https://cdn.pixabay.com/photo/2015/07/20/13/01/man-852770_1280.jpg",
    title: "Team Member",
  },
  {
    firstName: "Marian",
    lastName: "Ortega",
    imageUrl:
      "https://cdn.pixabay.com/photo/2023/01/28/23/14/woman-7751884_1280.jpg",
    title: "Team Member",
  },
  {
    firstName: "Philip",
    lastName: "Haynes",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/11/29/03/52/man-1867175_1280.jpg",
    title: "Team Member",
  },
];

const top = Array.of(teams[0], teams[1], teams[2]) as typeof teams;

export default async function OurTeam() {
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
