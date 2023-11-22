import { createContext, useState } from "react";

export const cartContext = createContext(null)

export default function StudentContext(props){
    const [cartLength,setCartLength] = useState(0)

    return(
        <cartContext.Provider value={{cartLength,setCartLength}}>
            {props.children}
        </cartContext.Provider>
    )
}