export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: RatingType;
}

interface RatingType {
  rate: number;
  count: number;
}
