import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {doc, setDoc} from 'firebase/firestore'

const AuthContext = createContext()

export function AuthContextProvider({children}){

    const [user, setUser]=useState({})

    //---------Sign Up-------------
    function signUp(email,password){
         createUserWithEmailAndPassword(auth, email, password);
         setDoc(doc(db, 'users', email),{
            savedMovies:[]
         })
    }
    //---------Login-------------
    function Login(email,password){
        return signInWithEmailAndPassword(auth, email, password)
    }
    //---------Log Out-------------
    function LogOut(){
        return signOut(auth)
    }
    //---------onAuth Change-------------
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            return setUser(currentUser);
        });
        return ()=>{
            unSubscribe();
        }
    })

    return(
        <AuthContext.Provider value={{signUp,Login, LogOut, user}}>
        {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext);
}
