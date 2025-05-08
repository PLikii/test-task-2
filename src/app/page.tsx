import Link from "next/link";

export default function Home() {
  return (
    <div className=" flex h-screen flex-col items-center justify-center space-y-10 text-3xl text-title">
      <h1 className=" text-4xl"> Please authenticate.</h1>
      <div className=" flex gap-10">
        <div className=" border- border-gray-500 border-b-2 pb-2 text-4xl drop-shadow-2xl duration-150 hover:scale-110 hover:border-border">
          <Link href="/login">Log in</Link>
        </div>
        <div className=" border- border-gray-500 border-b-2 pb-2 text-4xl drop-shadow-2xl duration-150 hover:scale-110 hover:border-border">
          <Link href="/register" className=" t">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
