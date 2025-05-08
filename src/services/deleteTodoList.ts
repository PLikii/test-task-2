import { db } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

export const deleteTodoList = async (
  id: string,
  name: string,
  onSuccess?: () => void,
) => {
  const confirm = await Swal.fire({
    title: "Delete list?",
    text: `Are you sure you want to delete? "${name}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
  });

  if (confirm.isConfirmed) {
    try {
      await deleteDoc(doc(db, "todoLists", id));
      Swal.fire("Deleted!", "List successfully deleted.", "success");
      if (onSuccess) onSuccess();
    } catch (_error) {
      Swal.fire("Error", "Failed to delete list.", "error");
    }
  }
};
