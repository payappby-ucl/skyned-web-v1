// export const dynamic = "force-dynamic";

import Alert from "@/src/components/alert";
import { brandServerApi } from "@/src/lib/server";
import { ICategory } from "@workspace/shared";
import Link from "next/link";

interface Props {
  searchParams: URLSearchParams;
}

export default async function BrowseByCategories({ searchParams }: Props) {
  try {
    const { data } = await brandServerApi.httpClient.request<ICategory[]>(
      "/categories",
      "GET",
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    const defaultSearchParams = new URLSearchParams(searchParams);

    return (
      <aside className="mt-20 hidden gap-4 md:col-span-1 md:grid md:grid-cols-1 md:self-start">
        <h4 className="!font-regular !text-sm">Browse By Categories</h4>
        <nav className="hide-scrollbar h-96 overflow-x-hidden overflow-y-scroll scroll-smooth md:h-80">
          <ul>
            <li>
              <Link
                href="/blog"
                aria-label="All Category"
                scroll={false}
                className={`!font-regular block border-l px-4 py-1 text-sm capitalize ${!defaultSearchParams.get("c") ? "border-l-brand text-brand font-bold" : ""}`}
              >
                All Category
              </Link>
            </li>
            {data.map((category) => {
              const urlSearchParams = new URLSearchParams(searchParams);
              const isActive = urlSearchParams.get("c") === category.name;

              urlSearchParams.set("c", category.name);
              const query = Object.fromEntries(urlSearchParams.entries());
              return (
                <li key={category.name}>
                  <Link
                    href={{
                      pathname: "/blog",
                      query,
                    }}
                    scroll={false}
                    aria-label="All Category"
                    className={`!font-regular block border-l px-4 py-1 text-sm capitalize ${isActive ? "border-l-brand text-brand font-bold" : ""}`}
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    );
  } catch (error) {
    return <Alert message="Error" />;
  }
}
