import { createContext, useState } from "react";

export const staffContext = createContext(null)

export default function StaffContext(props){
    const [staff,setStaff] = useState(null)

    return(
        <staffContext.Provider value={{staff,setStaff}}>
            {props.children}
        </staffContext.Provider>
    )
}