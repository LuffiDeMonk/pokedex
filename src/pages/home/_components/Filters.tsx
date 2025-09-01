import AppIcon from "@/components/common/AppIcon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultiSelect from "@/components/ui/multi-select";
import { POKEMON_TYPES } from "@/constants";
import { useFormContext } from "react-hook-form";
interface FormProps {
  search: string;
  type: string[];
  sort: string;
  layout: string;
}
export default function Filters() {
  const form = useFormContext<FormProps>();
  const handleClearFilters = () => {
    form.reset();
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <AppIcon name="filter" size={20} className="mr-2" />
            Filters & Search
          </h3>
          <Button variant="outline" size="sm" onClick={handleClearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="space-y-3">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search</FormLabel>
                <FormControl>
                  <Input
                    prefixIcon={
                      <AppIcon name="search" className="stroke-gray-300" />
                    }
                    className="placeholder:text-gray-300"
                    placeholder="Search by pokemon name"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={POKEMON_TYPES}
                      values={field.value}
                      placeholder="Select pokemon types"
                      onValueChange={(value) => {
                        const current = form.getValues("type");
                        if (current.includes(value)) return;
                        form.setValue("type", [...current, value]);
                      }}
                      onBadgeCloseIconClick={(value) => {
                        const filteredValues = form
                          .getValues("type")
                          .filter((item) => item !== value);
                        form.setValue("type", [...filteredValues]);
                      }}
                      onCloseAllClick={() => form.resetField("type")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
