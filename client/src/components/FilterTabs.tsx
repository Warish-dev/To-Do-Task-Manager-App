import { Filter } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilterTabsProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const FilterTabs = ({ currentFilter, onFilterChange }: FilterTabsProps) => {
  return (
    <div className="flex border-b">
      <button
        className={cn(
          "flex-1 px-4 py-3 text-sm font-medium",
          currentFilter === "all"
            ? "border-b-2 border-primary text-primary"
            : "text-gray-500 hover:text-gray-700"
        )}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={cn(
          "flex-1 px-4 py-3 text-sm font-medium",
          currentFilter === "active"
            ? "border-b-2 border-primary text-primary"
            : "text-gray-500 hover:text-gray-700"
        )}
        onClick={() => onFilterChange("active")}
      >
        Active
      </button>
      <button
        className={cn(
          "flex-1 px-4 py-3 text-sm font-medium",
          currentFilter === "completed"
            ? "border-b-2 border-primary text-primary"
            : "text-gray-500 hover:text-gray-700"
        )}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterTabs;
