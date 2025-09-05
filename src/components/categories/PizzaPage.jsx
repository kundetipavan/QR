import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { MenuCard } from '../MenuCard';

export function PizzaPage() {
  const { menuItems } = useApp();
  const pizzaItems = menuItems.filter(item => item.category === 'Pizza');

  return (
    <div className="max-w-7xl mx-auto px-4 pt-4 sm:px-6 lg:px-8 pb-20">
      <h1 className="text-2xl font-bold mb-6">Pizza Menu</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pizzaItems.map(item => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
