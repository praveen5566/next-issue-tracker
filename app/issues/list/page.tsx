import Pagination from "@/app/components/Pagination";
import { prisma } from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const { status, orderBy, page } = await searchParams;
  const statuses = Object.values(Status);
  const queryStatus = statuses.includes(status) ? status : undefined;
  const queryOrderBy = columnNames.includes(orderBy)
    ? { [orderBy]: "asc" }
    : undefined;

  const where = {
    status: queryStatus,
  };
  const queryPage = parseInt(page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy: queryOrderBy,
    skip: (queryPage - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={{ status, orderBy, page }} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={queryPage}
      />
    </Flex>
  );
};

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all Issues",
};

export default IssuesPage;
