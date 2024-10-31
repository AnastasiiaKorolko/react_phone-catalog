export interface ProductDescription {
  id: string;
  itemId?: string;
  name: string;
  namespaceId?: string;
  category: string;
  capacityAvailable: string[];
  capacity: string;
  price: number;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  image: string;
  description: { text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell: string[];
  year: number;
}
