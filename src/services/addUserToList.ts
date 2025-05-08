import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import Swal from "sweetalert2";

export const addUserToList = async (listId: string) => {
  const { value: email } = await Swal.fire({
    title: "Enter user email",
    input: "email",
    inputLabel: "User email",
    inputPlaceholder: "user@example.com",
    showCancelButton: true,
  });

  if (email) {
    try {
      const listRef = doc(db, "todoLists", listId);
      await updateDoc(listRef, {
        users: arrayUnion(email),
      });

      Swal.fire("User added!", `Email ${email}successfully added.`, "success");
    } catch (_error) {
      Swal.fire("Error", "Failed to add user.", "error");
    }
  }
};
