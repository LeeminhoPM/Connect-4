import { Bot, Users } from "lucide-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import logo from "../assets/logo.png";

const DEPTH_OPTIONS = [1, 2, 3, 4, 5, 6, 7];

export const Home = () => {
    const { gameMode, setGameMode, maxDepth, setMaxDepth } =
        useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen bg-gray-700 text-white flex justify-center items-center">
            <div className="flex flex-col">
                <img src={logo} className="w-200" />
                <div className="flex items-center justify-center mb-8">
                    <div className="mr-4">
                        <button
                            onClick={() => setGameMode(0)}
                            className={`p-8 m-6 mb-4 bg-gray-500 rounded-lg cursor-pointer shadow-2xl transition-all duration-200 ${gameMode === 0 ? "bg-green-500" : "hover:bg-gray-400"}`}
                        >
                            <Users size={40} />
                        </button>
                        <p
                            className={`w-full text-center font-semibold text-lg transition-all duration-200 ${gameMode === 0 ? "text-green-500" : "text-gray-500"}`}
                        >
                            Chơi với người
                        </p>
                    </div>
                    <div className="ml-4">
                        <button
                            onClick={() => setGameMode(1)}
                            className={`p-8 m-6 mb-4 bg-gray-500 rounded-lg cursor-pointer shadow-2xl transition-all duration-200 ${gameMode === 1 ? "bg-green-500" : "hover:bg-gray-400"}`}
                        >
                            <Bot size={40} />
                        </button>
                        <p
                            className={`w-full text-center font-semibold text-lg transition-all duration-200 ${gameMode === 1 ? "text-green-500" : "text-gray-500"}`}
                        >
                            Chơi với máy
                        </p>
                    </div>
                </div>
                {gameMode === 1 && (
                    <div className="bg-gray-900 rounded-2xl shadow-2xl p-4">
                        <p className="w-full text-center mb-4 font-semibold text-lg">
                            Độ mạnh AI
                        </p>
                        <div className="w-full flex justify-center">
                            {DEPTH_OPTIONS.map((value, index) => (
                                <button
                                    onClick={() => setMaxDepth(value)}
                                    key={index}
                                    className={`px-6 py-4 bg-gray-800 text-xl cursor-pointer transition-all duration-200 ${maxDepth === value ? "bg-green-500" : "hover:bg-gray-700"} ${index === 0 ? "rounded-l-lg border-r border-gray-700" : index === DEPTH_OPTIONS.length - 1 ? "rounded-r-lg" : "border-r border-gray-700"}`}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => navigate("/game")}
                        className="px-12 py-6 bg-green-500 rounded-lg text-2xl cursor-pointer shadow-2xl hover:bg-green-400 transition-colors duration-200"
                    >
                        Bắt đầu
                    </button>
                </div>
            </div>
        </div>
    );
};
