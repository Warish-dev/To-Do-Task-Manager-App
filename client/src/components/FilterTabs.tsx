import { Filter } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface FilterTabsProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const FilterTabs = ({ currentFilter, onFilterChange }: FilterTabsProps) => {
  return (
    <Tabs
      defaultValue={currentFilter}
      value={currentFilter}
      onValueChange={(value) => onFilterChange(value as Filter)}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-teal-500/20 to-blue-500/20 p-1">
        {["all", "active", "completed"].map((filter) => (
          <TabsTrigger 
            key={filter} 
            value={filter}
            className={cn(
              "transition-all duration-200",
              currentFilter === filter 
                ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white data-[state=active]:text-white"
                : "hover:bg-white/20"
            )}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default FilterTabs;