import { useEffect, useState } from "react";
import { api_instance } from "@/apiIntelesence";
import useFetchData from "./useFetchData";
import PaginationComponent from "@/components/Custom/PaginationComponent";
import SearchComponent from "@/components/Custom/SearchComponent";

interface props {
  indexFn: () => Promise<any>;
  dependencies: any[];
}

const useIndex = ({ indexFn, dependencies }: props) => {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const url = indexFn?.toString().split("`")[1];

  const { data, isLoading, refetch } = useFetchData(
    [...dependencies, perPage, page, search],
    () =>
      api_instance.post(
        `${url}?per_page=${perPage}&page_number=${page}&filter=${search}`
      )
  );

  const totalItems = data?.data?.meta?.total ?? 0;
  const totalPages = Math.ceil(totalItems / perPage);

  const paginationComponent = (
    <PaginationComponent
      currentPage={page}
      totalPages={totalPages}
      onPageChange={(pageNumber) => setPage(pageNumber)}
      setCurrentPage={setPage}
      perPage={perPage}
      setPerPage={setPerPage}
    />
  );

  useEffect(() => {
    if (search) {
      setPage(1);
    }
  }, [search]);

  const searchComponent = (
    <SearchComponent
      onSearch={(searchValue) => {
        setIsSearching(true);
        // setPage(1);
        setSearch(searchValue);
      }}
      isLoading={isSearching}
    />
  );
  if (perPage > totalItems) {
    return { data, searchComponent, isLoading, refetch };
  } else {
    return { data, paginationComponent, searchComponent, isLoading, refetch };
  }
};

export default useIndex;
