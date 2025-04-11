import { IssueStatusBadge, Link } from "@/app/components/index";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { prisma } from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const { status, orderBy } = await searchParams;
  const statuses = Object.values(Status);
  const queryStatus = statuses.includes(status) ? status : undefined;
  const queryOrderBy = columns.map((column) => column.value).includes(orderBy)
    ? { [orderBy]: "asc" }
    : undefined;
  const issues = await prisma.issue.findMany({
    where: {
      status: queryStatus,
    },
    orderBy: queryOrderBy,
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    pathname: "/issues/list",
                    query: { status: status ?? "", orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === orderBy ? (
                  <FiArrowUp className="m-1 inline" />
                ) : (
                  <FiArrowDown className="m-1 inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt?.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
