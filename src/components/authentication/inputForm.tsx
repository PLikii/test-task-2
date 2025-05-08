import type { InputFormProps } from "@/types/InputFormProps";

export default function InputForm({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  handle,
}: InputFormProps) {
  return (
    <>
      <input
        type="email"
        className="mb-2 w-full rounded border p-2"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="mb-2 w-full rounded border p-2"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        type="button"
        className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
        onClick={handle}
        disabled={loading}
      >
        {loading ? "Wait..." : "Confirm"}
      </button>
    </>
  );
}
