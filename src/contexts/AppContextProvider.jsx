import React, { useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import {
    DIFFICULTY_LEVELS,
    STORAGE_KEYS,
    DEFAULT_SCORES,
} from "../constants/gameConstants";

const loadSavedSettings = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return saved ? JSON.parse(saved) : {};
    } catch {
        return {};
    }
};

export const AppContextProvider = ({ children }) => {
    const initialSettings = loadSavedSettings();

    // Game mode: 0 = 2 Players (PvP), 1 = vs AI (PvE)
    const [gameMode, setGameMode] = useState(
        initialSettings.gameMode !== undefined ? initialSettings.gameMode : 0,
    );

    // AI Difficulty & Depth
    const [aiDifficulty, setAiDifficulty] = useState(
        initialSettings.aiDifficulty || "medium",
    );
    const [maxDepth, setMaxDepth] = useState(() => {
        const found = DIFFICULTY_LEVELS.find(
            (d) => d.id === (initialSettings.aiDifficulty || "medium"),
        );
        return found ? found.depth : 4;
    });

    // Player Piece: 1 = Red (Goes first), 2 = Yellow (Goes second)
    const [playerPiece, setPlayerPiece] = useState(
        initialSettings.playerPiece !== undefined ? initialSettings.playerPiece : 1,
    );

    // Sound toggle state
    const [soundEnabled, setSoundEnabled] = useState(
        initialSettings.soundEnabled !== undefined ? initialSettings.soundEnabled : true,
    );

    // Persistent Scores
    const [scores, setScores] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.SCORES);
            return saved ? { ...DEFAULT_SCORES, ...JSON.parse(saved) } : DEFAULT_SCORES;
        } catch {
            return DEFAULT_SCORES;
        }
    });

    // Save settings when changed
    useEffect(() => {
        try {
            localStorage.setItem(
                STORAGE_KEYS.SETTINGS,
                JSON.stringify({ aiDifficulty, playerPiece, soundEnabled, gameMode }),
            );
        } catch {
            // Ignore storage write error
        }
    }, [aiDifficulty, playerPiece, soundEnabled, gameMode]);

    // Save scores when changed
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
        } catch {
            // Ignore storage write error
        }
    }, [scores]);

    const handleSetAiDifficulty = (diffId) => {
        setAiDifficulty(diffId);
        const match = DIFFICULTY_LEVELS.find((d) => d.id === diffId);
        if (match) {
            setMaxDepth(match.depth);
        }
    };

    const handleSetMaxDepth = (depth) => {
        setMaxDepth(depth);
        const match = DIFFICULTY_LEVELS.find((d) => d.depth === depth);
        if (match) {
            setAiDifficulty(match.id);
        }
    };

    const recordGameResult = (winner, mode) => {
        setScores((prev) => {
            const updated = { ...prev };
            if (winner === null) {
                // Draw
                updated.draws += 1;
            } else if (mode === 0) {
                // PvP
                if (winner === 1) updated.p1 += 1;
                else updated.p2 += 1;
            } else {
                // PvE vs AI
                const humanWon = winner === playerPiece;
                if (humanWon) {
                    updated.p1 += 1;
                    updated.streak = updated.streak > 0 ? updated.streak + 1 : 1;
                } else {
                    updated.ai += 1;
                    updated.streak = updated.streak < 0 ? updated.streak - 1 : -1;
                }
            }
            return updated;
        });
    };

    const resetScores = () => {
        setScores(DEFAULT_SCORES);
        try {
            localStorage.removeItem(STORAGE_KEYS.SCORES);
        } catch {
            // Ignore
        }
    };

    const toggleSound = () => {
        setSoundEnabled((prev) => !prev);
    };

    const contextValue = {
        gameMode,
        setGameMode,
        maxDepth,
        setMaxDepth: handleSetMaxDepth,
        aiDifficulty,
        setAiDifficulty: handleSetAiDifficulty,
        playerPiece,
        setPlayerPiece,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
        scores,
        recordGameResult,
        resetScores,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};
