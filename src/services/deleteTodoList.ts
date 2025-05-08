import { db } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

export const deleteTodoList = async (
  id: string,
  name: string,
  onSuccess?: () => void,
) => {
  const confirm = await Swal.fire({
    title: "Delete list?",
    text: `Are you sure you want to delete "${name}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
  });

  if (!confirm.isConfirmed) return;

  try {
    const docRef = doc(db, "todoLists", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      Swal.fire("Error", "List does not exist.", "error");
      return;
    }

    const data = docSnap.data();
    const user = getAuth().currentUser;

    if (!user) {
      Swal.fire("Error", "User not authenticated.", "error");
      return;
    }

    if (data.createdBy === user.uid) {
      await deleteDoc(docRef);
      Swal.fire("Deleted!", "List successfully deleted.", "success");
    } else {
      await updateDoc(docRef, {
        users: arrayRemove(user.email),
      });
      Swal.fire("Left!", "You have been removed from the list.", "success");
    }

    if (onSuccess) onSuccess();
  } catch (_error) {
    Swal.fire("Error", "Failed to delete or leave the list.", "error");
  }
};
