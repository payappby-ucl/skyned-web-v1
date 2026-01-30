import * as React from "react";

interface SVGProps extends React.SVGProps<SVGSVGElement> {}

export const FringedEdge: React.FC<SVGProps> = (props) => (

  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    fill="currentColor"
    viewBox="0 0 50 50"
  >
    <path fill="currentColor" d="M50 0C22.386 0 0 22.386 0 50V0z"></path>
  </svg>
);


