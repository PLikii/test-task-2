"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase"; // імпортуємо firebase
import Swal from "sweetalert2";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function CreateLists() {
  const [loading, setLoading] = useState(false);

  const handleAddList = async () => {
    const { value: listName } = await Swal.fire({
      title: "Enter a list name",
      input: "text",
      inputPlaceholder: "List name",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Create",
      inputValidator: value => {
        if (!value) {
          return "The name cannot be empty!";
        }
      },
    });

    if (!listName) return;

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "todoLists"), {
          name: listName,
          createdBy: user.uid,
          users: [user.email],
          admin: [user.email],
          todoList: [],
          createdAt: Timestamp.now(),
        });

        Swal.fire({
          title: "List created!",
          text: `List "${listName}" created successfully.`,
          icon: "success",
        });
      }
    } catch (_error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return ( 
    <div className=" flex items-center justify-between p-4 ">
      <button
        type="button"
        onClick={handleAddList}
        disabled={loading}
        className="w-40 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {loading ? "Wait..." : "Add a list"}
      </button>
    </div>
  );
}
