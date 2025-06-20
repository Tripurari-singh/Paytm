import { AppBar } from "../components/AppBar";
import { Balance } from "../components/balance";
import { Users } from "../components/user";

export function DashBoard(){
    const user = {
        FirstName : "Tripurari",
        LastName : "singh",
        _id : 1
    }
    return (
        <div>
            <div>
                <AppBar/>
            </div>
            <div>
                <Balance value={1000} />
            </div>
            <div>
                <Users user={user} />
            </div>
        </div>
    )

}
