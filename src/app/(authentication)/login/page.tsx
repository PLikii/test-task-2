"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import InputForm from "@/components/authentication/inputForm";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      Swal.fire({
        title: "Успішно!",
        text: `Вітаю, ${user.email}!`,
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
        <h2 className="mb-4 font-bold text-lg">🔐 Log in</h2>
        <InputForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loading={loading}
          handle={handleLogin}
        />
      </div>
    </main>
  );
}
