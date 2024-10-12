import React from 'react';
import ShoppingList from './ShoppingList';

const ShoppingListContainer = ({ lists }) => {
  return (
    <div className="cont">
      {lists.map((list) => (
        <ShoppingList key={list.id} list={list} />
      ))}
    </div>
  );
};

export default ShoppingListContainer;
