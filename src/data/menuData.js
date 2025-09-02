export const menuItems = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, onion, and our special sauce',
    price: 12.99,
    category: 'Main Course',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    isVeg: false,
    spiceLevel: 'mild',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 2 },
      { name: 'Large', price: 4 }
    ],
    popular: true
  },
  {
    id: '2',
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with parmesan cheese, croutons, and caesar dressing',
    price: 9.99,
    category: 'Starters',
    image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=400',
    isVeg: true,
    spiceLevel: 'mild',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1.5 },
      { name: 'Large', price: 3 }
    ],
    new: true
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, and basil on crispy crust',
    price: 14.99,
    category: 'Main Course',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    isVeg: true,
    spiceLevel: 'mild',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 3 },
      { name: 'Large', price: 6 }
    ],
    popular: true
  },
  {
    id: '4',
    name: 'Pasta Carbonara',
    description: 'Creamy pasta with bacon, eggs, and parmesan cheese',
    price: 13.99,
    category: 'Main Course',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
    isVeg: false,
    spiceLevel: 'mild',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 2.5 },
      { name: 'Large', price: 5 }
    ],
    popular: true
  },
  {
    id: '5',
    name: 'Chicken Tikka',
    description: 'Tender chicken pieces marinated in spices and grilled to perfection',
    price: 16.99,
    category: 'Main Course',
    image: 'https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=400',
    isVeg: false,
    spiceLevel: 'spicy',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 3 },
      { name: 'Large', price: 6 }
    ]
  },
  {
    id: '6',
    name: 'Fish Curry',
    description: 'Fresh fish cooked in aromatic spices and coconut milk',
    price: 18.99,
    category: 'Dry Fish',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
    isVeg: false,
    spiceLevel: 'medium',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 3.5 },
      { name: 'Large', price: 7 }
    ]
  },
  {
    id: '7',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie served with vanilla ice cream',
    price: 6.99,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    isVeg: true,
    spiceLevel: 'mild',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1 },
      { name: 'Large', price: 2 }
    ]
  },
  {
    id: '8',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 4.99,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
    isVeg: true,
    spiceLevel: 'mild',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1 },
      { name: 'Large', price: 2 }
    ]
  },
  {
    id: '9',
    name: 'Garlic Bread',
    description: 'Crispy bread with garlic butter and herbs',
    price: 5.99,
    category: 'Starters',
    image: 'https://images.pexels.com/photos/209196/pexels-photo-209196.jpeg?auto=compress&cs=tinysrgb&w=400',
    isVeg: true,
    spiceLevel: 'mild',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1 },
      { name: 'Large', price: 2 }
    ]
  },
  {
    id: '10',
    name: 'Spicy Chicken Wings',
    description: 'Crispy chicken wings tossed in spicy buffalo sauce',
    price: 11.99,
    category: 'Starters',
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400',
    isVeg: false,
    spiceLevel: 'spicy',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 2 },
      { name: 'Large', price: 4 }
    ],
    popular: true
  },
  {
    id: '11',
    name: 'Veggie Wrap',
    description: 'Fresh vegetables wrapped in a soft tortilla with hummus',
    price: 8.99,
    category: 'Main Course',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400',
    isVeg: true,
    spiceLevel: 'mild',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 1.5 },
      { name: 'Large', price: 3 }
    ]
  },
  {
    id: '12',
    name: 'Iced Coffee',
    description: 'Cold brew coffee served with ice and cream',
    price: 3.99,
    category: 'Beverages',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    isVeg: true,
    spiceLevel: 'mild',
    sizes: [
      { name: 'Small', price: 0 },
      { name: 'Medium', price: 0.5 },
      { name: 'Large', price: 1 }
    ]
  }
];

export const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages', 'Dry Fish'];