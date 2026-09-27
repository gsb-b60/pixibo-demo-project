export interface ProductImage {
  id: string;
  index: number;
  title: string;
  image_url: string;
  thumbnail_url: string;
}

export interface ProductData {
  product_title: string;
  price: string;
  short_description: string;
  long_description: string;
  bullet_points: string[];
  options: Record<string, string[]>;
  tags: string[];
  categories: string[];
  seo_title?: string;
  seo_description?: string;
  attributes?: Record<string, unknown>;
  status?: string;
  language?: string;
  collections?: unknown[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ScenePack {
  id: string;
  state: string;
  error_message: string | null;
  images: ProductImage[];
  categories: Category[];
  visibility: string;
  custom_category: string | null;
  product_data: ProductData;
}

export interface ApiMeta {
  slug: string;
  name: string;
  total: number;
  description?: string;
}

export interface ApiResponse {
  meta: ApiMeta;
  data: ScenePack[];
}