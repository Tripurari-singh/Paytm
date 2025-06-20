import { AppBar } from "../components/AppBar";
import { Balance } from "../components/balance";
import { Users } from "../components/user";


export function DashBoard() {
  const user = {
    FirstName: "Tripurari",
    LastName: "Singh",
    _id: 1,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="w-full">
        <AppBar />
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Balance value={1000} />
        <Users user={user} />
      </div>
    </div>
  );
}

