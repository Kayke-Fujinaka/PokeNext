import { GetStaticProps, NextPage } from "next";
import api from "../services/api";

export interface IPokeApi {
  count: number;
  next: string;
  previous: null;
  results: IPokemonInfo[];
}

export interface IPokemonInfo {
  name: string;
  url: string;
  id: number;
}

interface IProps {
  pokemons: IPokemonInfo[];
}

const Home: NextPage<IProps> = ({ pokemons }) => {
  return (
    <>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>{pokemon.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<IPokeApi>("/pokemon?limit=151");

  const pokemons: IPokemonInfo[] = data.results.map((pokemon, i) => ({
    ...pokemon,
    id: i + 1,
  }));

  return {
    props: {
      pokemons,
    },
  };
};
