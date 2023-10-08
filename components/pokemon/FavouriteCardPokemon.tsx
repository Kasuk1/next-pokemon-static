import { Card } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const FavouriteCardPokemon: FC<{ pokeId: number }> = ({ pokeId }) => {
  const router = useRouter();

  const handleFavouriteClick = () => router.push(`/pokemon/${pokeId}`);
  return (
    <Card
      isHoverable
      isPressable
      className='p-5'
      onClick={handleFavouriteClick}
    >
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`}
        alt=''
        width={100}
        height={0}
      />
    </Card>
  );
};
