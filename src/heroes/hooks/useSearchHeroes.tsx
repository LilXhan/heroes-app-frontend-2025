import { useQuery } from '@tanstack/react-query'
import { searchHeroesAction } from '../actions/search-heroes-action';

interface Options {
  name?: string;
  team?: string;
  category?: string;
  universe?: string;
  status?: string;
  strength?: string;
}
export const useSearchHeroes = ({ name, team, category, universe, status, strength }: Options) => {
  return useQuery({
    queryKey: ['search', { name, strength, category, universe, status, team }],
    queryFn: () => searchHeroesAction({ name, strength, category, universe, status, team }),
    staleTime: 1000 * 60 * 5,
    retry: false
  })
}
