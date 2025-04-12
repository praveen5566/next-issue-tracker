import Pagination from "@/app/components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return <Pagination itemCount={1000} pageSize={10} currentPage={parseInt(searchParams.page)} />;
}
