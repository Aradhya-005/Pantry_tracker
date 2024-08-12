"use client"

import React, { useState, useEffect} from "react";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from 'react-router-dom';
import Link from "next/link";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/auth/firebase"; // Ensure this path is correct
import "../css/AdditemForm.css"; // Ensure you have the necessary CSS
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Modal from "./Modal";

interface PantryItem {
  id: string;
  itemName: string;
  quantity: number;
  price: number;
  category: string;
  expiryDate: Timestamp;
  addedDate: Timestamp;
}

const AddItemForm = () => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("Fruits");
  const [price, setPrice] = useState(0);
  const [expiryDateStr, setExpiryDateStr] = useState("");
  const [items, setItems] = useState<PantryItem[]>([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<PantryItem | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);




  // Hook for navigation

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

 

  const handleSubmit = async () => {
    try {
      const expiryDate = Timestamp.fromDate(new Date(expiryDateStr));
      const addedDate = Timestamp.now();

      await addDoc(collection(db, "pantryItems"), {
        itemName,
        quantity,
        price,
        category,
        expiryDate,
        addedDate,
      });

      // Clear form fields
      setItemName("");
      setQuantity(1);
      setCategory("Fruits");
      setPrice(0);
      setExpiryDateStr("");

      // Fetch items again to update the list
      fetchItems();
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const fetchItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pantryItems"));
      const itemsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PantryItem[];
      setItems(itemsList);
    } catch (error) {
      console.error("Error fetching items: ", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const formatDate = (date: Timestamp) => {
    const dateObj = date.toDate();
    const day = dateObj.toLocaleString("en-US", { day: "numeric" });
    const month = dateObj.toLocaleString("en-US", { month: "long" });
    const year = dateObj.toLocaleString("en-US", { year: "numeric" });

    return `${day} ${month} ${year}`;
  };

  const handleUpdate = async () => {
    if (editingItem) {
      try {
        const expiryDate = Timestamp.fromDate(new Date(editingItem.expiryDate.toDate().toISOString()));
        const itemRef = doc(db, "pantryItems", editingItem.id);

        await updateDoc(itemRef, {
          itemName: editingItem.itemName,
          quantity: editingItem.quantity,
          price: editingItem.price,
          category: editingItem.category,
          expiryDate,
        });

        // Close modal and fetch items
        setEditModalOpen(false);
        fetchItems();
      } catch (error) {
        console.error("Error updating item: ", error);
      }
    }
  };

  const handleDelete = async () => {
    if (itemToDelete) {
      try {
        const itemRef = doc(db, "pantryItems", itemToDelete);
        await deleteDoc(itemRef);

        // Close modal and fetch items
        setDeleteModalOpen(false);
        fetchItems();
      } catch (error) {
        console.error("Error deleting item: ", error);
      }
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div className="tooltip">
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
            required
          />
          <span className="tooltiptext">Enter the name of the item</span>
        </div>
        <div className="tooltip">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
            min="1"
            required
          />
          <span className="tooltiptext">Enter the quantity of the item</span>
        </div>
        <div className="tooltip">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
            min="0"
            required
          />
          <span className="tooltiptext">Enter the price of the item</span>
        </div>
        <div className="tooltip">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Grains">Grains</option>
            <option value="Others">Others</option>
          </select>
          <span className="tooltiptext">Select the category of the item</span>
        </div>
        <div className="tooltip">
          <input
            type="date"
            value={expiryDateStr}
            onChange={(e) => setExpiryDateStr(e.target.value)}
            required
          />
          <span className="tooltiptext">
            Select the expiry date of the item
          </span>
        </div>
        <button type="submit">Add Item</button>
      </form>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 900,
          marginTop: 2,
          border: "1px solid grey",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell   align="center"
                sx={{
                  color: "#d7b4fb",
                  fontFamily: "Space Grotesk",
                  fontSize: "20px",
                }} >Item Name</TableCell>
              <TableCell   align="center"
                sx={{
                  color: "#d7b4fb",
                  fontFamily: "Space Grotesk",
                  fontSize: "20px",
                }}>Quantity</TableCell>
              <TableCell   align="center"
                sx={{
                  color: "#d7b4fb",
                  fontFamily: "Space Grotesk",
                  fontSize: "20px",
                }}>Price</TableCell>
              <TableCell   align="center"
                sx={{
                  color: "#d7b4fb",
                  fontFamily: "Space Grotesk",
                  fontSize: "20px",
                }}>Category</TableCell>
              <TableCell   align="center"
                sx={{
                  color: "#d7b4fb",
                  fontFamily: "Space Grotesk",
                  fontSize: "20px",
                }}>Expiry Date</TableCell>
              <TableCell   align="center"
                sx={{
                  color: "#d7b4fb",
                  fontFamily: "Space Grotesk",
                  fontSize: "20px",
                }}>Added Date</TableCell>
              <TableCell   align="center"
                sx={{
                  color: "#d7b4fb",
                  fontFamily: "Space Grotesk",
                  fontSize: "20px",
                }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell  align="left"
                    sx={{
                      color: "white",
                      fontFamily: "Space Grotesk",
                      fontSize: "15px",
                    }} component="th" scope="row">
                  {item.itemName}
                </TableCell>
                <TableCell   align="center"
                    sx={{
                      color: "white",
                      fontFamily: "Space Grotesk",
                      fontSize: "15px",
                    }}>{item.quantity}</TableCell>
                <TableCell   align="center"
                    sx={{
                      color: "white",
                      fontFamily: "Space Grotesk",
                      fontSize: "15px",
                    }}>${item.price}</TableCell>
                <TableCell align="center"
                    sx={{
                      color: "white",
                      fontFamily: "Space Grotesk",
                      fontSize: "15px",
                    }} >{item.category}</TableCell>
                <TableCell  align="center"
                    sx={{
                      color: "white",
                      fontFamily: "Space Grotesk",
                      fontSize: "15px",
                    }} >
                  {formatDate(item.expiryDate)}
                </TableCell>
                <TableCell   align="center"
                    sx={{
                      color: "white",
                      fontFamily: "Space Grotesk",
                      fontSize: "15px",
                    }}>{formatDate(item.addedDate)}</TableCell>
                <TableCell   align="center"
                    sx={{
                      color: "white",
                      fontFamily: "Space Grotesk",
                      fontSize: "15px",
                    }}>
                  <EditOutlinedIcon
                     sx={{
                      color: "#ffff",
                      cursor: "pointer",
                      "&:hover": {
                        color: "#6a6868",
                      },
                      marginRight:'8px'
                    }}
                    onClick={() => {
                      setEditingItem(item);
                      setEditModalOpen(true);
                    }}
                  
                  />
                  <DeleteOutlineOutlinedIcon
                     sx={{
                      color: "#ffff",
                      cursor: "pointer",
                      "&:hover": {
                        color: "#6a6868",
                      },
                    }}
                    onClick={() => {
                      setItemToDelete(item.id);
                      setDeleteModalOpen(true);
                    }}
                    
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <h2>Edit Item</h2>
        {editingItem && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <input
              type="text"
              value={editingItem.itemName}
              onChange={(e) =>
                setEditingItem({ ...editingItem, itemName: e.target.value })
              }
              placeholder="Item Name"
              required
            />
            <input
              type="number"
              value={editingItem.quantity}
              onChange={(e) =>
                setEditingItem({ ...editingItem, quantity: Number(e.target.value) })
              }
              placeholder="Quantity"
              min="1"
              required
            />
            <input
              type="number"
              value={editingItem.price}
              onChange={(e) =>
                setEditingItem({ ...editingItem, price: Number(e.target.value) })
              }
              placeholder="Price"
              min="0"
              required
            />
            <select
              value={editingItem.category}
              onChange={(e) =>
                setEditingItem({ ...editingItem, category: e.target.value })
              }
              required
            >
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Grains">Grains</option>
              <option value="Others">Others</option>
            </select>
            <input
              type="date"
              value={editingItem.expiryDate.toDate().toISOString().split("T")[0]}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  expiryDate: Timestamp.fromDate(new Date(e.target.value)),
                })
              }
              required
            />
            <button type="submit">Update Item</button>
          </form>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <p className="delete-content">Are you sure you want to delete this item?</p>
        <button className="delete-content-button-1" onClick={() => setDeleteModalOpen(false)}>No</button>
        <button className="delete-content-button" onClick={handleDelete}>Yes</button>
      </Modal>
     
      <Link href="/chatbot">
      <ChatIcon   color="primary"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          fontSize:'40px',
          color: "#fff",
          "&:hover": {
            color: "#6a6851",
          },
          
        }}/>
      </Link>
    </div>
  );
};

export default AddItemForm;
