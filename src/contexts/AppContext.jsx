import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [gameMode, setGameMode] = useState(0);
    const [maxDepth, setMaxDepth] = useState(4);

    const contextValue = {
        gameMode,
        setGameMode,
        maxDepth,
        setMaxDepth,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
