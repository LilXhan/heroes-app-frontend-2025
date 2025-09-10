import { useSearchParams } from 'react-router';
import { use, useMemo } from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { useHeroSummary } from '@/heroes/hooks/useHeroSummary';
import { usePaginatedHero } from '@/heroes/hooks/usePaginatedHero';
import { FavoriteHeroContext } from '@/heroes/context/FavoriteHeroContext';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab]);

  const { data: heroesResponse } = usePaginatedHero(page, limit, category);
  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title='Superhero Universe'
          description='Discover, explore and management your favorites superheroes and villains.'
        />
        {/* <CustomBreadCrumbs currentPage='Superheros' /> */}

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'all');
              prev.set('page', '1');
              prev.set('category', 'all');
              return prev;
            })} value="all">All Characters ({summary?.totalHeroes})</TabsTrigger>
            <TabsTrigger onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'favorites');
              return prev;
            })} value="favorites" className="flex items-center gap-2">
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'heroes');
              prev.set('category', 'hero');
              prev.set('page', '1');
              return prev;
            })} value="heroes">Heroes ({summary?.heroCount})</TabsTrigger>
            <TabsTrigger onClick={() => setSearchParams((prev) => {
              prev.set('tab', 'villains');
              prev.set('category', 'villain');
              prev.set('page', '1');
              return prev;
            })} value="villains">Villains ({summary?.villainCount})</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <h1>All characters</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="favorites">
            <h1>Favorites!</h1>
            <HeroGrid heroes={favorites ?? []} />
          </TabsContent>
          <TabsContent value="heroes">
            <h1>Heroes!</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value="villains">
            <h1>Villains!</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        {
          selectedTab !== 'favorites' &&
          <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
        }
      </>
    </>
  )
}
