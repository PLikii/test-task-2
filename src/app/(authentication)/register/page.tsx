"use client";

import InputForm from "@/components/authentication/inputForm";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });
      Swal.fire({
        title: "Successfully!",
        text: "Successful registration!",
        icon: "success",
        confirmButtonText: "Ок",
      });
      router.push("/dashboard");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: err,
        text: "Something went wrong!",
        confirmButtonText: "Ок",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="mx-auto mt-10 max-w-sm rounded-xl border p-4 shadow">
        <h2 className="mb-4 font-bold text-lg">🔐 Registration</h2>
        <input
          type="string"
          className="mb-2 w-full rounded border p-2"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <InputForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          handle={handleRegister}
        />
      </div>
    </main>
  );
}
