export interface PizzaBlockProps {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}

export interface SearchContextType {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface CategoriesProps {
    value: number;
    onClickCategory: (index: number) => void;
}

export interface CartState {
    cart: {
      totalPrice: number;
      items: [];
    };
}

export interface CartProps {
    totalPrice: number;
    items: CartItem[];
}

export interface SortState {
    value: number;
    onChangeSort: (i: number) => void;
    filter: {
      sort: number;
    };
}

export interface SkeletonProps {
    speed?: number;
    width?: number;
    height?: number;
    viewBox?: string;
    backgroundColor?: string;
    foregroundColor?: string;
}

export interface Pizza {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
    category: number;
    rating: number;
}

export interface FilterState {
    filter: {
      categoryId: number;
      sort: number;
    };
}

export interface CartItem { 
    id: number;
    price: number;
    count: number;
}

export interface CategoryId {
    categoryId: number;
    sort: number;
}