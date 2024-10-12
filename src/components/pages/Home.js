import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShoppingLists } from './../features/shoppingListSlice';
import axios from 'axios';
import ShoppingList from './../ShoppingList';
import ShoppingListForm from './../ShoppingListForm';
import './../shoppingList.css'

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
    <div className='top'>
      <h2>Your Shopping Lists</h2>
      <ShoppingListForm />
    <div className="cont mt-5">
      
      <div className="mt-3">
        {shoppingLists.map((list) => (
          <ShoppingList key={list.id} list={list} />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;
