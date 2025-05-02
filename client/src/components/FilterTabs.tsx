import { Filter } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default FilterTabs;