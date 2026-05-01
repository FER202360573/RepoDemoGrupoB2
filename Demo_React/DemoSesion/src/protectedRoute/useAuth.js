import { useState,useEffect } from "react";
import {useActionData} from 'react-router-dom';

export function useAuth(){
    const [user, setUser]=useState(null);
    const [loading, setLoading]=useState(true);

    const checkAuth =async()=>{
        console.log("Ejecutando checkAuth");
        try{
            const res=await fetch("http://localhost:3000/perfil",{
            });

            if(!res.ok)throw new Error();
            const data= await res.json();
            setUser(data.user);
        }catch{
            setUser(null);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        checkAuth();
    },[]);

    return {user,loading, checkAuth}; 
}