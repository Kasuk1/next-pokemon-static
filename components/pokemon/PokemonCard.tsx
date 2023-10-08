import { FC } from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import Image from 'next/image';
import { SmallPokemon } from '@/interfaces';
import { useRouter } from 'next/router';

type PokemonCardProps = {
  pokemon: SmallPokemon;
};

export const PokemonCard: FC<PokemonCardProps> = ({
  pokemon: { id, img, name },
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/name/${name}`);
  };

  return (
    <div className='sm-3 cursor-pointer' onClick={handleClick}>
      <Card className='w-48 h-60'>
        <CardBody className='flex justify-center items-center'>
          <Image
            src={img}
            alt={`${name} pokemon`}
            width={0}
            height={0}
            className='h-20 w-auto'
          />
        </CardBody>
        <CardFooter className='flex justify-between items-center'>
          <p className='font-bold capitalize'>{name}</p>
          <p>#{id}</p>
        </CardFooter>
      </Card>
    </div>
  );
};
