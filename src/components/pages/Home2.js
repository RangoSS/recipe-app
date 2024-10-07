import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// shopping list slice is needed on home page
import { addShoppingList, deleteShoppingList, updateShoppingList } from './../features/shoppingListSlice';
import axios from 'axios';

const Home = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const shoppingLists = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShoppingLists = async () => {
      const response = await axios.get('http://localhost:3001/shoppingLists');
      response.data.forEach(list => {
        dispatch(addShoppingList(list));
      });
    };

    fetchShoppingLists();
  }, [dispatch]);

  const handleAddList = async (e) => {
    e.preventDefault();
    const newList = { name, quantity, notes, category, image };
    const response = await axios.post('http://localhost:3001/shoppingLists', newList);
    dispatch(addShoppingList(response.data));
    resetForm();
  };

  const handleDeleteList = async (id) => {
    await axios.delete(`http://localhost:3001/shoppingLists/${id}`);
    dispatch(deleteShoppingList(id));
  };

  const resetForm = () => {
    setName('');
    setQuantity('');
    setNotes('');
    setCategory('');
    setImage(null);
  };

  return (
    <div className="container">
      <h2>Shopping Lists</h2>
      <form onSubmit={handleAddList}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Quantity</label>
          <input type="text" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Optional Notes</label>
          <input type="text" className="form-control" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input type="file" className="form-control" id="image" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary">Add Shopping List</button>
      </form>
      <h3>Your Lists</h3>
      <ul className="list-group">
        {shoppingLists.map((list) => (
          <li key={list.id} className="list-group-item d-flex justify-content-between align-items-center">
            {list.name}
            <button className="btn btn-danger" onClick={() => handleDeleteList(list.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
