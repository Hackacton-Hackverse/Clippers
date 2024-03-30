import './account.css'
import { IoClose } from "react-icons/io5";
const Account =({PrintAccount, userInfo}) =>{
    return (
        <>

            <div className="account-content">
                <button className="closeaccount" onClick={PrintAccount}>
                    <IoClose className="account-logout"/>
                </button>
                <div>
                    <h1>
                        username : {userInfo.username}
                    </h1>
                    <h1>
                        email: {userInfo.email}
                    </h1>
                </div>
            </div>

        </>
    )
}

export default Account