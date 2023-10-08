import { Button, Link } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import NextLink from 'next/link';

export const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <div
      className={`bg-slate-800 text-white flex w-full flex-wrap items-center justify-between py-0 px-5`}
    >
      <NextLink href='/' className='flex items-center'>
        <Image
          src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/transparent/back/151.png'
          alt='Icono de pokemon'
          width={70}
          height={70}
        />
        <p className='text-4xl'>P</p>
        <p>okemon</p>
      </NextLink>

      <div className='flex items-center gap-3'>
        <NextLink href='/favourites'>Favourites</NextLink>
        <div className='flex gap-1'>
          <Button
            radius='full'
            className='bg-zinc-200 text-black font-bold shadow-lg'
            size='sm'
            onClick={() => setTheme('light')}
          >
            Light
          </Button>
          <Button
            radius='full'
            className='bg-slate-900 text-slate-100 font-bold shadow-lg'
            size='sm'
            onClick={() => setTheme('dark')}
          >
            Dark
          </Button>
        </div>
      </div>
    </div>
  );
};
