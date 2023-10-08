import { FC } from 'react';
import { FavouriteCardPokemon } from '.';

type FavouritesListProps = {
  favourites: number[];
};

export const FavouritesList: FC<FavouritesListProps> = ({ favourites }) => {
  return (
    <div className='flex flex-wrap gap-2 justify-start'>
      {favourites.map((pokeId) => (
        <FavouriteCardPokemon key={pokeId} pokeId={pokeId} />
      ))}
    </div>
  );
};
