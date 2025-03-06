import React, { PropsWithChildren } from "react";
import { Html, Head, Tailwind, Font } from "@react-email/components";

interface Props {
  title: string;
}
const Layout: React.FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <Html lang="en">
      <Head>
        <title>{title}</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#007291",
              },
            },
          },
        }}
      >
        {children}
      </Tailwind>
    </Html>
  );
};

export default Layout;
