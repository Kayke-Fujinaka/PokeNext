import api from "../services/api";

import { GetServerSideProps, NextPage } from "next";
import React from "react";

export interface PokeApiI {
  count: number;
  next: string;
  previous: null;
  results: PokemonInfoI[];
}

export interface PokemonInfoI {
  name: string;
  url: string;
  id: number;
  imagen: string;
}

interface PropsI {
  pokemons: PokemonInfoI[];
}

const Home: NextPage<PropsI> = ({ pokemons }) => {
  return (
    <>
      <div>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>{pokemon.name}</li>
        ))}
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get<PokeApiI>("/pokemon?limit=151");

  const pokemons: PokemonInfoI[] = data.results.map((pokemon, i) => ({
    ...pokemon,
    id: i + 1,
  }));

  return {
    props: {
      pokemons,
    },
  };
};
