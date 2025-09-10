import { RouterProvider } from "react-router/dom";
import { appRouter } from './router/app.router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FavoriteHeroProvider } from './heroes/context/FavoriteHeroContext';

export const HeroesApp = () => {
  const queryClient = new QueryClient();
  console.log(import.meta.env.VITE_API_URL);
  return (
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={appRouter} />
      </FavoriteHeroProvider>
    </QueryClientProvider >
  )
}

