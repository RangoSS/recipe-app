import React, { useEffect, useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';

import { deleteShoppingList, updateShoppingList } from './features/shoppingListSlice';
import axios from 'axios';
import './shoppingList.css';

const ShoppingList = ({ list }) => {
  const dispatch = useDispatch();
  

  // Get the current user from the Redux state
  const currentUser = useSelector((state) => state.auth.user.id);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedList, setUpdatedList] = useState({
    name: list.name,
    quantity: list.quantity,
    notes: list.notes,
    category: list.category,
    image: list.image,
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Get user ID from localStorage
  //const currentUserId = localStorage.getItem('user.id');
  const currentUserId = useSelector((state) => state.auth.user.id);
   console.log('my idss',currentUserId)
  useEffect(() => {
    if (list.image) {
      setImagePreview(list.image);
    }
  }, [list.image]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/shoppingLists/${list.id}`);
    dispatch(deleteShoppingList(list.id));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    const updatedData = {
      ...updatedList,
      id: list.id, // Preserve the original ID
    };

    await axios.put(`http://localhost:3001/shoppingLists/${list.id}`, updatedData);
    dispatch(updateShoppingList(updatedData));
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedList({
      ...updatedList,
      [name]: value,
    });
  };

  // Check if the list belongs to the current user
  if (list.userId !== currentUserId) {
    return null; // Don't display the list if it doesn't belong to the current user
  }

  return (
    <div className="row-container">
      <div className="mb-4" style={{ margin: '10px', border: '1px solid red' }}>
        <div className="card mb-2" style={{ width: '18rem' }}>
          {isEditing ? (
            <div className="card-body">
              <h5 className="card-title">Update Shopping List</h5>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedList.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={updatedList.quantity}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <input
                  type="text"
                  name="notes"
                  value={updatedList.notes}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={updatedList.category}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button className="btn btn-success mt-2" onClick={handleUpdate}>
                Save
              </button>
            </div>
          ) : (
            <div className="card-body">
              <h5 className="card-title">{list.name}</h5>
              <p className="card-text">Quantity: {list.quantity}</p>
              <p className="card-text">Notes: {list.notes}</p>
              <p className="card-text">Category: {list.category}</p>
              {imagePreview && (
                <img src={imagePreview} alt={list.name} className="img-fluid" />
              )}
              <button className="btn btn-primary mt-2" onClick={handleEditClick}>
                Edit
              </button>
              <button className="btn btn-danger mt-2" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
