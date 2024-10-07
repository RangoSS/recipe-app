import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShoppingLists } from './../features/shoppingListSlice';
import axios from 'axios';
import ShoppingList from './../ShoppingList';
import ShoppingListForm from './../ShoppingListForm';

const Home = () => {
  const dispatch = useDispatch();
  const shoppingLists = useSelector((state) => state.shoppingList);

  useEffect(() => {
    const fetchShoppingLists = async () => {
      const response = await axios.get('http://localhost:3001/shoppingLists');
      dispatch(setShoppingLists(response.data));
    };
    fetchShoppingLists();
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h2>Your Shopping Lists</h2>
      <ShoppingListForm />
      <div className="mt-3">
        {shoppingLists.map((list) => (
          <ShoppingList key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default Home;
