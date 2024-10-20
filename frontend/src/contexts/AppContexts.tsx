import React, { useContext } from "react";

type AppContext={
    showToast:(toastMessage:ToastMessage)=>void;
}

type ToastMessage={
    message:string;
    type:"SUCCESS"|"ERROR";
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({children}:{
    children:React.ReactNode;
})=>{
    return(
        <AppContext.Provider value={{showToast:(toastMessage)=>{
            console.log(toastMessage)
            console.log(children);
        }}}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () =>{
    const context = useContext(AppContext);
    return context as AppContext;
}
