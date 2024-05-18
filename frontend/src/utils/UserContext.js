const { createContext, useContext, useState } = require("react");

const userContext = createContext(null);

export const useUserContext = ( )=>{
    return useContext(userContext);
}

export const UserProvider = (props)=>{
const [userId,setUserId] = useState("")
    return <userContext.Provider value={{userId,setUserId}}>
        {props.children}
    </userContext.Provider> 
}

