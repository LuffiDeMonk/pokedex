import AppIcon from "@/components/common/AppIcon";
import type { PokeAPI } from "pokeapi-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  CATEGORY_OPTIONS,
  LEARN_METHOD_OPTIONS,
  SORT_OPTIONS,
  TYPES_OPTIONS,
} from "../constant/pokemon_move_filters";
import type { FilterForm } from "../constant/form-schema";
import PokemonMovesContainer from "./PokemonMovesContainer";
import { Suspense } from "react";
import PokemonMoveCardSkeleton from "./PokemonMoveCardSkeleton";

interface PokemonMovesTabProps {
  moves: PokeAPI.PokemonMove[] | undefined;
}

export default function PokemonMovesTab({ moves }: PokemonMovesTabProps) {
  const filterForm = useForm<FilterForm>({
    defaultValues: {
      search: "",
      selectedType: TYPES_OPTIONS[0].value,
      selectedCategory: CATEGORY_OPTIONS[0].value,
      sortBy: SORT_OPTIONS[0].value,
      learn_method: LEARN_METHOD_OPTIONS[0].value,
    },
  });

  const handleClearFilters = () => {
    filterForm.reset();
  };

  return (
    <Form {...filterForm}>
      <Card className="mb-6">
        <CardContent className="pt-6 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <AppIcon name="filter" size={20} className="mr-2" />
              Filters & Search
            </h3>
            <Button variant="outline" size="sm" onClick={handleClearFilters}>
              Clear All
            </Button>
          </div>
          <div>
            <FormField
              control={filterForm.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter move name..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <FormField
              control={filterForm.control}
              name="learn_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Learn Methods</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LEARN_METHOD_OPTIONS.map((type) => (
                        <SelectItem value={type.value} key={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={filterForm.control}
              name="selectedType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Move Types</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TYPES_OPTIONS.map((type) => (
                        <SelectItem value={type.value} key={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={filterForm.control}
              name="selectedCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Move Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((type) => (
                        <SelectItem value={type.value} key={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={filterForm.control}
              name="sortBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort By</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SORT_OPTIONS.map((type) => (
                        <SelectItem value={type.value} key={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
      <Suspense fallback={<PokemonMoveCardSkeleton />}>
        <PokemonMovesContainer moves={moves} />
      </Suspense>
    </Form>
  );
}
