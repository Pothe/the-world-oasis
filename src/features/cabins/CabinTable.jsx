import styled from "styled-components";

import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
function CabinTable() {
  //1) filter the cabins based on the discount query parameter
  const [searchParams] = useSearchParams();
  const filterField = searchParams.get("discount") || "all";
  let filterValues;
  const { isLoading, Cabins } = useCabins();
  if (filterField === "all") filterValues = Cabins;
  if (filterField === "with-discount")
    filterValues = Cabins?.filter((cabin) => cabin.discount > 0);
  if (filterField === "no-discount")
    filterValues = Cabins?.filter((cabin) => cabin.discount === 0);
  // 2) sort the filtered cabins based on the sort query parameter
  const sortBy = searchParams.get("sort") || "startDate-asc";
  const [sortField, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortCabin = filterValues?.sort(
    (a, b) => (a[sortField] - b[sortField]) * modifier,
  );
  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>

      {sortCabin?.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
      <Pagination count={Cabins?.length} />
    </Table>
  );
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <CabinTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default CabinTable;
