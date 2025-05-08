import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export async function editTodoListName(id: string, currentName: string) {
  const { value: newName } = await Swal.fire({
    title: "Edit list name",
    input: "text",
    inputLabel: "New name",
    inputValue: currentName,
    showCancelButton: true,
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    inputValidator: value => {
      if (!value) {
        return "Name cannot be empty.!";
      }
    },
  });

  if (newName && newName !== currentName) {
    try {
      const listRef = doc(db, "todoLists", id);
      await updateDoc(listRef, { name: newName });
      Swal.fire("Saved!", "Title updated.", "success");
      return true;
    } catch (_error) {
      Swal.fire("Error", "Failed to update title.", "error");
    }
  }

  return false;
}
