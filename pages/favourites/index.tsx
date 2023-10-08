import { useState, useEffect } from 'react';
import { Layout } from '@/components/layouts';
import { FavouritesList, NoFavourites } from '@/components/ui';
import { localFavourites } from '@/utils';

const Favourites = () => {
  const [favourites, setFavourites] = useState<number[]>([]);

  useEffect(() => {
    setFavourites(localFavourites.pokemons());
  }, []);

  return (
    <Layout title='Favourites Pokemon'>
      {favourites.length === 0 ? (
        <NoFavourites />
      ) : (
        <FavouritesList favourites={favourites} />
      )}
    </Layout>
  );
};

export default Favourites;
