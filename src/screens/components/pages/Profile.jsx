export default function Profile({ theme }) {
  return (
    <div
      className={`w-screen h-full py-4 px-4 flex flex-col gap-4 ${theme === "light" ? "text-slate-950 bg-slate-50" : "text-slate-50 bg-slate-800"} transition duration-150 ease-in`}
    >
      <h1>Profile</h1>
    </div>
  );
}
