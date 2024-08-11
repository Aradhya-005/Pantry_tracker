import { NextResponse } from 'next/server';
import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '@/auth/firebase';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const userMessage = data.message?.toLowerCase() || "";
    console.log("User Message:", userMessage);  // Debugging line to check the incoming message
    let responseMessage = "";

    const pantryCollection = collection(db, 'pantryItems');

    if (userMessage.includes("how many items")) {
      const snapshot = await getDocs(pantryCollection);
      const itemCount = snapshot.size;
      responseMessage = `You have ${itemCount} item(s) in your pantry.`;
    } else if (userMessage.includes("add item")) {
      const itemName = data.itemName?.toLowerCase();
      const itemQuantity = data.itemQuantity || 1;
      const expiryDate = data.expiryDate || null;

      if (itemName) {
        const itemRef = doc(pantryCollection, itemName);
        await setDoc(itemRef, {
          quantity: itemQuantity,
          expiryDate: expiryDate,
        });
        responseMessage = `${itemQuantity} ${itemName}(s) added to the pantry.`;
      } else {
        responseMessage = "Please specify the item name.";
      }
    } else if (userMessage.includes("update item")) {
      const itemName = data.itemName?.toLowerCase();
      const itemQuantity = data.itemQuantity || 1;
      const expiryDate = data.expiryDate || null;

      const itemRef = doc(pantryCollection, itemName);

      const docSnapshot = await getDoc(itemRef);
      if (docSnapshot.exists()) {
        await updateDoc(itemRef, {
          quantity: itemQuantity,
          expiryDate: expiryDate,
        });
        responseMessage = `${itemName} updated to ${itemQuantity} with expiry ${expiryDate || 'N/A'}.`;
      } else {
        responseMessage = "Item not found in the pantry.";
      }
    } else if (userMessage.includes("delete item")) {
      const itemName = data.itemName?.toLowerCase();
      const itemRef = doc(pantryCollection, itemName);

      const docSnapshot = await getDoc(itemRef);
      if (docSnapshot.exists()) {
        await deleteDoc(itemRef);
        responseMessage = `${itemName} deleted from the pantry.`;
      } else {
        responseMessage = "Item not found in the pantry.";
      }
    } else if (userMessage.includes("check expiry")) {
      const itemName = data.itemName?.toLowerCase();
      const itemRef = doc(pantryCollection, itemName);

      const docSnapshot = await getDoc(itemRef);
      if (docSnapshot.exists()) {
        const item = docSnapshot.data();
        responseMessage = `${itemName} expires on ${item.expiryDate || 'no expiry date'}.`;
      } else {
        responseMessage = "Item not found in the pantry.";
      }
    } else {
      responseMessage = "I'm not sure how to help with that. Please try again with a different request.";
    }

    console.log("Response Message:", responseMessage);  // Debugging line to check the outgoing message
    return new NextResponse(responseMessage, {
      headers: { 'Content-Type': 'text/plain' }
    });

  } catch (error) {
    console.error("Error in /api/chat:", error);

    return new NextResponse('Internal Server Error', { status: 500, headers: { 'Content-Type': 'text/plain' } });
  }
}

