import { NextPage, GetStaticProps } from 'next';
import { Layout } from '@/components/layouts';
import { PokemonListResponse, SmallPokemon } from '@/interfaces';
import { PokemonCard } from '@/components/pokemon';
import { pokeApi } from '@/api';

type HomeProps = {
  pokemons: SmallPokemon[];
};

const Home: NextPage<HomeProps> = ({ pokemons }) => {
  return (
    <Layout title='Listado de Pokemones'>
      <div className='flex justify-start gap-2 flex-wrap'>
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));

  /* const pokemons: SmallPokemon[] = await Promise.all(
    data.results.map(async (pokemon) => {
      const {
        data: { id, sprites },
      } = await pokeApi.get<PokemonResponse>(`/pokemon/${pokemon.name}`);

      return {
        ...pokemon,
        id,
        img: sprites.other?.dream_world.front_default,
      } as SmallPokemon;
    })
  );
 */
  return {
    props: {
      pokemons,
    },
  };
};

export default Home;
