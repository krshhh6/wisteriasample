export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  spicy?: boolean;
  vegetarian: boolean;
  popular?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableLocation: 'rooftop-edge' | 'canopy-lounge' | 'indoor-lounge' | 'sky-bar';
  specialRequests?: string;
  status: 'pending' | 'confirmed';
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
