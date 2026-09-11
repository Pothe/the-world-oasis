import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ sortField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get(sortField) || "";
  const handleChange = (e) => {
    searchParams.set(sortField, e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
