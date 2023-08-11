export interface CreateProductProps {
  name: string;
  author: string;
  category_id?: string;
}

export interface QueryProductProps {
  name: string;
  author: string;
}

export interface UpdateProductProps {
  id: string;
  name: string;
  author: string;
  category_id?: string;
}
