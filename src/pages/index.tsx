import { GetStaticProps, NextPage } from "next";
import Image from "next/image"
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
  image: string
}

interface IProps {
  pokemons: IPokemonInfo[];
}

const Home: NextPage<IProps> = ({ pokemons }) => {
  return (
    <>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Image src={pokemon.image} alt={pokemon.name} unoptimized width="100" height="100"/>
            {pokemon.id}.{" "}
            {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get<IPokeApi>("/pokemon?limit=151");

  const pokemons: IPokemonInfo[] = data.results.map((pokemon, i) => {
    const id = i + 1
    return {
      ...pokemon,
      id,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
};
