import { MenuCategory } from '../types';

export const menuCategories: MenuCategory[] = [
  {
    id: 'tandoor',
    name: 'Tandoor Starters',
    icon: 'Flame',
    items: [
      {
        id: 'tan1',
        name: 'Chicken Tikka',
        price: 320,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80',
        vegetarian: false,
        spicy: true,
        popular: true,
        description: 'Tender boneless chicken marinated in yogurt, Kashmiri red chilies, and aromatic spices, roasted in our traditional clay tandoor oven.'
      },
      {
        id: 'tan2',
        name: 'Paneer Tikka',
        price: 280,
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        spicy: true,
        description: 'Fresh cottage cheese cubes skewered with crisp bell peppers, onions, and slow-roasted with robust tandoori masalas.'
      },
      {
        id: 'tan3',
        name: 'Chicken Malai Kebab',
        price: 340,
        image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80',
        vegetarian: false,
        popular: true,
        description: 'Melt-in-the-mouth grilled chicken skewers, marinated in a velvety combination of rich cream, cheese, cardamom, and white pepper.'
      },
      {
        id: 'tan4',
        name: 'Dahi Ke Sholay',
        price: 249,
        image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        description: 'Crispy bread pockets stuffed with a rich, seasoned hung curd, bell pepper, and fresh coriander mixture, fried to golden perfection.'
      },
      {
        id: 'tan5',
        name: 'Hara Bara Kebab',
        price: 249,
        image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        description: 'A blend of fresh spinach, green peas, and potatoes, mildly spiced and pan-fried with a crisp cashew crown.'
      },
      {
        id: 'tan6',
        name: 'Paneer Malai Tikka',
        price: 280,
        image: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        description: 'Delicate cottage cheese marinated in a luxurious creamy white marinade, grilled till lightly golden with a smoky edge.'
      }
    ]
  },
  {
    id: 'mocktails',
    name: 'Special Mocktails',
    icon: 'Wine',
    items: [
      {
        id: 'drk1',
        name: 'RedBull Strawberry Mocktail',
        price: 299,
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        popular: true,
        description: 'The ultimate energy-infused indulgence. Premium RedBull combined with a sweet crushed strawberry puree, fresh lime, and mint leaves, served ice-cold.'
      },
      {
        id: 'drk2',
        name: 'Kiwi Blast',
        price: 249,
        image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        description: 'A refreshing explosion of fresh kiwis, crushed ice, citrus splash, and sweet syrup, garnished with a kiwi wheel.'
      },
      {
        id: 'drk3',
        name: 'Pinacolada',
        price: 249,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        description: 'A tropical blend of rich coconut cream, pineapple juice, and crushed ice, offering a smooth, creamy vacation in a glass.'
      },
      {
        id: 'drk4',
        name: 'Cucumber Cooler',
        price: 159,
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        description: 'Crisp English cucumber slices muddled with fresh mint leaves, lime juice, and carbonated soda. Highly hydrating and refreshing.'
      },
      {
        id: 'drk5',
        name: 'Spicy Mango',
        price: 189,
        image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        description: 'Sweet mango nectar shaken with fresh lime juice, a dash of red chili powder, and black salt, complete with a chili-salted rim.'
      }
    ]
  },
  {
    id: 'chinese',
    name: 'Signature Chinese',
    icon: 'UtensilsCrossed',
    items: [
      {
        id: 'chi1',
        name: 'Veg Manchurian',
        price: 259,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        popular: true,
        description: 'Crispy, deep-fried vegetable dumplings tossed in a highly addictive, dark and glossy soy, garlic, and scallion sauce.'
      },
      {
        id: 'chi2',
        name: 'Chilli Chicken',
        price: 329,
        image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80',
        vegetarian: false,
        spicy: true,
        popular: true,
        description: 'Crispy wok-fried chicken pieces glazed in a thick, sweet and spicy sauce with crunchy bell peppers, onions, and hot green chilies.'
      },
      {
        id: 'chi3',
        name: 'Dragon Chicken',
        price: 339,
        image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80',
        vegetarian: false,
        spicy: true,
        description: 'Indo-Chinese style strips of chicken fried and sautéed in a fiery, rich red pepper sauce, topped with toasted cashew nuts.'
      },
      {
        id: 'chi4',
        name: 'Honey Chilli Potato',
        price: 249,
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        description: 'Crispy-fried hand-cut potatoes glazed with natural sweet honey, chili paste, soy, and garnished with toasted sesame seeds.'
      }
    ]
  },
  {
    id: 'desserts',
    name: 'Sizzling Desserts',
    icon: 'Cupcake',
    items: [
      {
        id: 'des1',
        name: 'Brownie Sizzler',
        price: 199,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        popular: true,
        description: 'A hot, dense double-chocolate fudge brownie placed on a piping hot cast iron plate, topped with rich vanilla bean ice cream and sizzled at your table with molten dark chocolate sauce.'
      },
      {
        id: 'des2',
        name: 'Brownie with Ice Cream',
        price: 129,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        description: 'Decadent baked chocolate walnut brownie served warm with a scoop of premium vanilla ice cream and dark chocolate drizzle.'
      },
      {
        id: 'des3',
        name: 'Hot Gulab Jamun',
        price: 99,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        description: 'Two soft, warm milk-solid dumplings soaked in an aromatic sugar syrup infused with green cardamom and saffron threads.'
      }
    ]
  },
  {
    id: 'bites',
    name: 'Fast Food & Light Bites',
    icon: 'Cookie',
    items: [
      {
        id: 'fb1',
        name: 'Tandoori Chicken Grilled Sandwich',
        price: 249,
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
        vegetarian: false,
        popular: true,
        description: 'Juicy roasted tandoori chicken shreds, layered with tandoori mayo, mint chutney, and melting mozzarella, grilled to golden crustiness.'
      },
      {
        id: 'fb2',
        name: 'Alfredo Chicken Pasta',
        price: 299,
        image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
        vegetarian: false,
        popular: true,
        description: 'Penne pasta cooked in a rich, creamy white parmesan cheese sauce, loaded with fresh sautéed garlic, mushrooms, and grilled chicken breast.'
      },
      {
        id: 'fb3',
        name: 'King Grill Burger',
        price: 269,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        vegetarian: false,
        description: 'A monster burger featuring our custom grilled spiced patty, double cheddar cheese, caramelized onions, crisp lettuce, tomato, and secret house sauce.'
      },
      {
        id: 'fb4',
        name: 'Alfredo Veg Pasta',
        price: 249,
        image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        description: 'Creamy white sauce penne pasta tossed with fresh baby corn, crisp broccoli, bell peppers, garlic, and fresh parmesan cheese.'
      }
    ]
  },
  {
    id: 'mains',
    name: 'Main Courses',
    icon: 'Soup',
    items: [
      {
        id: 'main1',
        name: 'Mutton Rogan Josh',
        price: 449,
        image: 'https://images.unsplash.com/photo-1545247181-516773cae76d?auto=format&fit=crop&w=600&q=80',
        vegetarian: false,
        popular: true,
        description: 'Our house specialty. Tender, slow-cooked prime mutton chunks simmered in a rich, aromatic gravy of caramelized onions, yogurt, ginger, and authentic Kashmiri chilies.'
      },
      {
        id: 'main2',
        name: 'Paneer Butter Masala',
        price: 289,
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=600&q=80',
        vegetarian: true,
        popular: true,
        description: 'Juicy, soft cubes of cottage cheese drowned in a smooth, creamy, sweet-tangy tomato and butter gravy, flavored with dried fenugreek leaves.'
      },
      {
        id: 'main3',
        name: 'Chicken Butter Masala',
        price: 379,
        image: 'https://images.unsplash.com/photo-1545247181-516773cae76d?auto=format&fit=crop&w=600&q=80',
        vegetarian: false,
        description: 'Smoky, tandoor-cooked chicken pieces simmered in a luxurious, creamy tomato-cashew gravy enriched with butter and fresh cream.'
      }
    ]
  }
];

export const allMenuItems = menuCategories.flatMap(category => category.items);
