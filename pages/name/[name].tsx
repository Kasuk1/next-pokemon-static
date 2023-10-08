import { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { Pokemon, PokemonList, Sprites } from '@/interfaces';
import { getPokemonInfo, localFavourites } from '@/utils';

type PokemonByNamePageProps = {
  pokemon: Pokemon;
};

const PokemoByNamePage: NextPage<PokemonByNamePageProps> = ({
  pokemon: { name, sprites, id },
}) => {
  const [isInFavourites, setIsInFavourites] = useState<boolean>(false);

  const handleToggleFavourite = () => {
    localFavourites.handleToggleFavourite(id);
    setIsInFavourites(localFavourites.isPokemonInFavourites(id));

    if (isInFavourites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 100,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  useEffect(() => {
    setIsInFavourites(localFavourites.isPokemonInFavourites(id));
  }, [isInFavourites]);

  return (
    <Layout>
      <div className='mt-1 gap-2 flex flex-wrap'>
        <div className=''>
          <Card isHoverable className='px-8 py-8'>
            <CardBody>
              <Image
                src={
                  sprites.other?.dream_world.front_default || '/no-image.png'
                }
                alt={name}
                width={0}
                height={0}
                className='h-44 w-auto min-w-[210px]'
              />
            </CardBody>
          </Card>
        </div>

        <div className='flex-1'>
          <Card className='px-4 py-3'>
            <CardHeader className='flex justify-between gap-4'>
              <h1 className='capitalize font-bold text-3xl'>{name}</h1>
              <Button
                className={`${
                  isInFavourites ? 'bg-gray-950' : 'bg-blue-950'
                } font-bold`}
                onClick={handleToggleFavourite}
              >
                {isInFavourites
                  ? 'Remove from Favourites'
                  : 'Add to Favourites'}
              </Button>
            </CardHeader>
            <CardBody>
              <p className='text-xl'>Sprites:</p>

              <div className='flex justify-around pt-5'>
                <Image
                  src={sprites.front_default}
                  alt={name}
                  width={0}
                  height={0}
                  className='h-24 w-auto'
                />
                <Image
                  src={sprites.back_default}
                  alt={name}
                  width={0}
                  height={0}
                  className='h-24 w-auto'
                />
                <Image
                  src={sprites.front_shiny}
                  alt={name}
                  width={0}
                  height={0}
                  className='h-24 w-auto'
                />
                <Image
                  src={sprites.back_shiny}
                  alt={name}
                  width={0}
                  height={0}
                  className='h-24 w-auto'
                />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const {
    data: { results },
  } = await pokeApi.get<PokemonList>('/pokemon?limit=151');

  return {
    paths: results.map(({ name }) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { name } = ctx.params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemoByNamePage;
