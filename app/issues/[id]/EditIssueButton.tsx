import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <FiEdit />
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
