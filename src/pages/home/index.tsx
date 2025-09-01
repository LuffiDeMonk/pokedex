import { useFetchPokemons } from '@/query/use-fetch-pokemons';
import { useSuspenseQueries } from "@tanstack/react-query";
import { fetchPokemonCardDetails } from "@/api-client/fetch-pokemon-card-details";
import { getQueryStaleTime } from "@/utils/get-query-stale-time";
import Filters from "./_components/Filters";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import PokemonCardContainer from "./_components/PokemonCardContainer";

export default function Home() {
  const { data: pokemonListdata } = useFetchPokemons({ limit: 50 });
  const { data: pokemonData } = useSuspenseQueries({
    queries: pokemonListdata.results.map((pokemon) => ({
      queryKey: ["pokemon", "card", "details", { pokemonName: pokemon.name }],
      queryFn: ({ signal }) =>
        fetchPokemonCardDetails({ signal, pokemonName: pokemon.name }),
      enabled: !!pokemon.name,
      staleTime: getQueryStaleTime("Infinity"),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        isLoading: results.some((result) => result.isLoading),
      };
    },
  });
  interface FormProps {
    search: string;
    type: string[];
    sort: string;
    layout: string;
  }
  const form = useForm<FormProps>({
    defaultValues: {
      layout: "",
      search: "",
      sort: "",
      type: [],
    },
    mode: "onChange",
  });
  // const filteredPokemonData = () => {
  //   const selectedTypes = form.getValues("type").map((t) => t.toLowerCase());

  //   return pokemonData.filter((pokemon) =>
  //     selectedTypes.every((selected) =>
  //       pokemon.types.some((type) => type.type.name.toLowerCase() === selected)
  //     )
  //   );
  // };
  return (
    <Form {...form}>
      <div className="space-y-6">
        <Filters />
        <PokemonCardContainer pokemonData={pokemonData} />
      </div>
    </Form>
  );
}
