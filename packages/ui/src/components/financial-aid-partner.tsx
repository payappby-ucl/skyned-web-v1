import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface Props {
  name: string;
}
const FinancialAidPartner: React.FC<Props> = ({ name }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-5">
        <AvatarImage
          src={`/assets/images/partners-icons/${name}.png`}
          alt={`${name}'s icon`}
        />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <p className="capitalize text-md font-semibold">{name}</p>
    </div>
  );
};

export { FinancialAidPartner };
