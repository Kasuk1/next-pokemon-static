import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { pokeApi } from '@/api';
import { Pokemon } from '@/interfaces';
import { getPokemonInfo, localFavourites } from '@/utils';

type PokemonPageProps = {
  pokemon: Pokemon;
};

const PokemonPage: NextPage<PokemonPageProps> = ({
  pokemon: { name, sprites, id },
}) => {
  const [isInFavourites, setIsInFavourites] = useState<boolean>(
    localFavourites.isPokemonInFavourites(id)
  );

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

  return (
    <Layout title={name}>
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
  const pokemons151 = [...Array(151)].map((value, index) => String(index + 1));

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    // fallback: false,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id } = ctx.params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400, // 60 * 60 * 24
  };
};

export default PokemonPage;
