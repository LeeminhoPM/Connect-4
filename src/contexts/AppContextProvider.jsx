import { useState } from "react";
import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
    const [gameMode, setGameMode] = useState(0);
    const [maxDepth, setMaxDepth] = useState(4);
    const [playerPiece, setPlayerPiece] = useState(1);

    const contextValue = {
        gameMode,
        setGameMode,
        maxDepth,
        setMaxDepth,
        playerPiece,
        setPlayerPiece,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
