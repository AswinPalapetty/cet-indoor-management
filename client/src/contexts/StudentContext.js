import { createContext, useState } from "react";

export const studentContext = createContext(null)

export default function StudentContext(props){
    const [student,setStudent] = useState(null)

    return(
        <studentContext.Provider value={{student,setStudent}}>
            {props.children}
        </studentContext.Provider>
    )
}