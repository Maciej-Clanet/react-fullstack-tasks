import "./User_Task.css";
import { useState } from "react";
import axios from "axios";

export default function User_Tasks(){



    return(
        <>
            <SignUp/>
            <SignIn/>
        </>
    )
}


function SignUp(){
    const [email,setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    function createUser(event){
        event.preventDefault();
        setErrorMessage("");

        if(password != confirmPassword){
            setErrorMessage("passwords have to be the same, goober!!!");
            return;
        }
        // assembla data into one object to send
        let data_to_send = {
            email,
            "display_name" : displayName,
            password,
            "confirm_password" : confirmPassword
        }

        function handleResponse(res){
            alert("Success")
        }
        function handleError(err){
            alert("ERROR")
        }

        const url = "http://127.0.0.1:8001/user/" 
        axios.post(url ,data_to_send) 
        .then(handleResponse)
        .catch(handleError)

    }


    return(
        <form onSubmit={createUser}>
            <h1>Sign Up form</h1>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label><br/>
            <label>
                Display Name:
                <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </label><br/>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label><br/>
            <label>
                Confirm Password:
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <button type="submit">Make a goober</button>
            { errorMessage ? <h2>Error: {errorMessage}</h2> : null}
        </form>
    )
}

function SignIn(){

    

    return(
        <form>
            <h1>Log in form</h1>
        </form>
    )
}