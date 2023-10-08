import Image from 'next/image';

export const NoFavourites = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-xl'>No favourites</h1>
      <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/151.svg'
        alt='Mewto'
        width={250}
        height={250}
        className='opacity-[0.1] h-[calc(100vh-150px)]'
      />
    </div>
  );
};
