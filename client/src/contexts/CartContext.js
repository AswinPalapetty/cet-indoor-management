import { createContext, useState } from "react";

export const cartContext = createContext(null)

export default function StudentContext(props){
    const [cartItems,setCartItems] = useState({})
    const [cartLength,setCartLength] = useState(0)

    return(
        <cartContext.Provider value={{cartItems,setCartItems,cartLength,setCartLength}}>
            {props.children}
        </cartContext.Provider>
    )
}