import { Exhibition } from './exhibition.model';

export const ArticApiUrl = 'https://api.artic.edu/api/v1';

export const DefaultLimit = 30;
export const ExhibitionFields =
  'id,title,description,type,is_featured,gallery_title,status';

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export type ExhibitionsSearchResult = {
  data: Exhibition[];
  pagination: {
    current_page: number;
    limit: number;
    offset: number;
    total: number;
    total_pages: number;
  };
  error?: string;
};
