import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteShoppingList, updateShoppingList } from './features/shoppingListSlice';
import axios from 'axios';

const ShoppingList = ({ list }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedList, setUpdatedList] = useState({
    name: list.name,
    quantity: list.quantity,
    notes: list.notes,
    category: list.category,
    image: list.image,
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Check if list.image is a base64 string
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

    // Make API call to update shopping list
    await axios.put(`http://localhost:3001/shoppingLists/${list.id}`, updatedData);

    // Dispatch the update action
    dispatch(updateShoppingList(updatedData));

    // Exit editing mode
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedList({
      ...updatedList,
      [name]: value,
    });
  };

  return (
    <div className="card mb-2">
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
  );
};

export default ShoppingList;
