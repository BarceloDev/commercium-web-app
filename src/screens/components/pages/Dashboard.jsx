export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Bem Vindo {user.user_name}!</h1>
    </div>
  );
}
