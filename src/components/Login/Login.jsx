

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
    const auth = getAuth(app);
    console.log(app);
    const provider = new GoogleAuthProvider();

    const [user, setUser] = useState(null);


    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const looginedUser = result.user;
                console.log(looginedUser);
                setUser(looginedUser);
            })
            .catch(error => {
                console.log('Error', error.message);
            })
    }

    const handleGoogleSignOut = () => {
        signOut(auth)
            .then((result) => {
                console.log(result);
                setUser(null);
            })
            .catch((error) => {
                console.log("Error", error.message);
            });
    }

    return (
        <div>
            {user ?
                <button onClick={handleGoogleSignOut}>Sign Out</button>
                :
                <button onClick={handleGoogleSignIn}>Google Login</button>
            }
            
            {user && <div>
                <h3>User: {user?.displayName}</h3>
                <h4>Email: {user?.email}</h4>
            </div>}
        </div>
    );
};

export default Login;