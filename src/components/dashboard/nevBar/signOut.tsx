"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SignOut() {
  const user = auth.currentUser;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (_err) {
      Swal.fire({
        icon: "error",
        title: `Error ${_err}`,
        text: "Something went wrong!",
        confirmButtonText: "Ок",
      });
    }
  };
  return (
    <div className=" flex min-w-52 flex-col items-center justify-center pl-8 text-xl">
      <div>{user?.displayName ?? ""}</div>
      <div>
        <button
          type="button"
          onClick={handleLogout}
          className="m-6 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
        >
          Go out
        </button>
      </div>
    </div>
  );
}
