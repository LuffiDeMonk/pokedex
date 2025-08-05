import { useFetchPokemons } from "@/api/query/use-fetch-pokemons";

export default function Home() {
  const { data } = useFetchPokemons();
  if (!data) return null;
  console.log(data.results);
  return (
    <div className="flex flex-col gap-2">
      {data.results.map((item) => (
        <p>{item.url}</p>
      ))}
    </div>
  );
}
