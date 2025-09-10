import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { useSearchHeroes } from '@/heroes/hooks/useSearchHeroes';
import { useSearchParams } from 'react-router';
import { HeroGrid } from '@/heroes/components/HeroGrid';

export const SearchPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams] = useSearchParams();
  const { data: searchHeroes } = useSearchHeroes({
    name: searchParams.get('name') ?? '',
    strength: searchParams.get('strength') ?? '1',
    category: searchParams.get('category') ?? '',
    universe: searchParams.get('universe') ?? '',
    status: searchParams.get('status') ?? ''
  });

  return (
    <>
      <CustomJumbotron title='Search Superhero' description='Discover, explore and management your favorite superheros and villains.' />
      {/* <CustomBreadCrumbs currentPage='Search superheros' breadcrumbs={[{ label: 'home', to: '/' }, { label: 'home1', to: '/' }]} /> */}
      {/* Stats Dashboard */}
      <HeroStats />

      {/* Search Controls */}
      <SearchControls />

      {/* Grid */}

      {!searchHeroes ?
        <h1>No encontrado</h1> :
        <HeroGrid heroes={searchHeroes} />
      }
    </>
  )
};

export default SearchPage;
