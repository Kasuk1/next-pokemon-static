const handleToggleFavourite = (id: number) => {
  let favourites: number[] = JSON.parse(
    localStorage.getItem('favourites') || '[]'
  );

  if (favourites.includes(id)) {
    favourites = favourites.filter((pokeId) => pokeId !== id);
  } else {
    favourites.push(id);
  }

  localStorage.setItem('favourites', JSON.stringify(favourites));
};

const isPokemonInFavourites = (id: number): boolean => {
  if (typeof window === 'undefined') return false;

  const favourites: number[] = JSON.parse(
    localStorage.getItem('favourites') || '[]'
  );

  return favourites.includes(id);
};

const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem('favourites') || '[]');
};

export default { handleToggleFavourite, isPokemonInFavourites, pokemons };
