import React, { createContext, useState } from "react";

export let SearchContext= createContext();

export default function SearchContextProvider(props){
    const [Search, setSearch] = useState('')
    return <SearchContext.Provider value={{Search, setSearch}}>
            {props.children}
        </SearchContext.Provider>

}