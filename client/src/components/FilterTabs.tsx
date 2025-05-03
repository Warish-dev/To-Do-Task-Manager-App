import { Filter } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/lib/theme-context";

interface FilterTabsProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const FilterTabs = ({ currentFilter, onFilterChange }: FilterTabsProps) => {
  const { colorTheme } = useThemeContext();
  
  // Define gradient backgrounds based on color theme
  const getTabsListGradient = () => {
    return "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 dark:from-teal-500/30 dark:to-cyan-500/30";
  };
  
  const getActiveTabGradient = () => {
    return "bg-gradient-to-r from-teal-500 to-cyan-500 text-white data-[state=active]:text-white";
  };
  
  return (
    <Tabs
      defaultValue={currentFilter}
      value={currentFilter}
      onValueChange={(value) => onFilterChange(value as Filter)}
      className="w-full"
    >
      <TabsList className={cn("grid w-full grid-cols-3 p-1 rounded-md", getTabsListGradient())}>
        {["all", "active", "completed"].map((filter) => (
          <TabsTrigger 
            key={filter} 
            value={filter}
            className={cn(
              "transition-all duration-200 font-medium",
              currentFilter === filter 
                ? getActiveTabGradient()
                : "hover:bg-primary/10"
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