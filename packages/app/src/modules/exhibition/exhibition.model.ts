export enum ExhibitionStatus {
  Confirmed = 'Confirmed',
  Closed = 'Closed',
}

export type Exhibition = {
  id: number;
  title: string;
  description: string;
  is_featured: boolean;
  gallery_title: string;
  type: string;
  status: ExhibitionStatus;
};
