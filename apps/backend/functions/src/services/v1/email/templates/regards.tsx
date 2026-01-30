import { Section, Text } from "@react-email/components";
import React from "react";

/** Props needed for Regards component */
export interface RegardsProps {
  text?: string;
  from: string;
}
export const Regards: React.FC<RegardsProps> = ({
  text = "Best Regards.",
  from,
}) => {
  return (
    <Section>
      <Text className="m-0 text-xs">{text}</Text>
      <Text className="m-0 text-xs">{from}</Text>
    </Section>
  );
};
