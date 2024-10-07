import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Added useSelector to get current user
import { addShoppingList } from './features/shoppingListSlice';
import axios from 'axios';

const ShoppingListForm = () => {
  const dispatch = useDispatch();
  
  // Assuming you store the current user in the Redux state
  const currentUser = useSelector((state) => state.auth.currentUser); // Replace this with the correct path to your auth slice

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const handleAddShoppingList = async (e) => {
    e.preventDefault();

    // Prepare data for POST request
    const shoppingListData = {
      userId: currentUser?.id, // Include the current user's ID
      name,
      quantity,
      notes,
      category,
      image: image ? await convertToBase64(image) : null, // Convert image to base64
     
    };

    // POST the shopping list to the server
    const response = await axios.post('http://localhost:3001/shoppingLists', shoppingListData);
    
    // Dispatch the action to add the shopping list to the Redux store
    dispatch(addShoppingList(response.data));

    // Reset form fields
    setName('');
    setQuantity('');
    setNotes('');
    setCategory('');
    setImage(null);
  };

  // Helper function to convert image file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <form onSubmit={handleAddShoppingList} className="form-inline mb-3">
      <input
        type="text"
        className="form-control mr-2"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        className="form-control mr-2"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="text"
        className="form-control mr-2"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <input
        type="text"
        className="form-control mr-2"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="file"
        className="form-control mr-2"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit" className="btn btn-primary">Add Shopping List</button>
    </form>
  );
};

export default ShoppingListForm;
