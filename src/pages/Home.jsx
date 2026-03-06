import { Bot, CircleQuestionMark, Users, X } from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import logo from "../assets/logo.png";
import step1 from "../assets/step1.jpg";
import step2 from "../assets/step2.jpg";
import step3 from "../assets/step3.jpg";

const DEPTH_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

export const Home = () => {
    const {
        gameMode,
        setGameMode,
        maxDepth,
        setMaxDepth,
        playerPiece,
        setPlayerPiece,
    } = useContext(AppContext);

    const [howToPlay, setHowToPlay] = useState(false);

    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen bg-gray-700 text-white flex justify-center items-center relative">
            {howToPlay && (
                <div className="absolute inset-0 backdrop-blur-2xl flex justify-center items-center transition-opacity duration-300">
                    <div className="w-[70%] h-[90%] border border-white bg-gray-700 rounded-lg relative shadow-2xl">
                        <button
                            className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] p-1 rounded-full bg-gray-200 text-gray-800 cursor-pointer z-10"
                            onClick={() => setHowToPlay(false)}
                        >
                            <X size={30} />
                        </button>
                        <h2 className="sticky top-0 left-0 w-full h-[10%] flex items-center justify-center text-2xl font-bold border-b border-white rounded-tl-lg">
                            Hướng dẫn chơi
                        </h2>
                        <div className="h-[90%] overflow-hidden">
                            <div className="p-6 grid gap-y-12 h-full overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
                                <div className="grid grid-cols-2 gap-x-6">
                                    <img
                                        src={step1}
                                        alt=""
                                        className="rounded-lg"
                                    />
                                    <div className="text-justify">
                                        <div className="float-left px-3 text-5xl font-bold text-center">
                                            1
                                        </div>
                                        <b>Hiểu mục tiêu của trò chơi.</b> Trước
                                        khi bạn có thể bắt đầu chơi Connect Four
                                        hoặc lên kế hoạch chiến lược, bạn phải
                                        đảm bảo rằng mình hiểu mục tiêu của trò
                                        chơi. Để chiến thắng, một người chơi
                                        phải xếp được bốn quân cờ cùng màu thành
                                        một hàng. Ai làm được điều đó trước sẽ
                                        là người chiến thắng.
                                        <ul className="pl-4 mt-4 space-y-2 list-disc">
                                            <li>
                                                Có ba cách để xếp bốn quân cờ
                                                liên tiếp trong Connect Four:
                                                theo chiều ngang (horizontal),
                                                theo chiều dọc (vertical), theo
                                                đường chéo (diagonal).
                                            </li>
                                            <li>
                                                Một số phiên bản của Connect
                                                Four có thêm một cách chơi khác,
                                                trong đó bạn gắn thêm một cột
                                                vào bảng và cố gắng xếp năm quân
                                                cờ liên tiếp.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-x-6">
                                    <div className="text-justify">
                                        <div className="float-left px-3 text-5xl font-bold text-center">
                                            2
                                        </div>
                                        <b>Thực hiện một nước đi.</b> Khi đến
                                        lượt bạn trong Connect Four, bạn lấy một
                                        quân cờ và thả nó vào một khe ở phía
                                        trên của bảng. Bảng tiêu chuẩn có bảy
                                        cột và sáu hàng để lựa chọn. Ở nước đi
                                        đầu tiên, quân cờ của bạn thường sẽ rơi
                                        xuống hàng dưới cùng, nhưng bạn có thể
                                        chọn bất kỳ cột nào, tùy thuộc vào chiến
                                        lược của mình.
                                        <ul className="pl-4 mt-4 space-y-2 list-disc">
                                            <li>
                                                Bạn cần cân nhắc kỹ từng nước
                                                đi, vì sau khi bạn đi, đối thủ
                                                sẽ đến lượt. Họ không chỉ có cơ
                                                hội ngăn cản chiến lược xếp bốn
                                                quân liên tiếp của bạn, mà đôi
                                                khi nước đi của bạn còn có thể
                                                vô tình giúp họ dễ dàng tạo được
                                                bốn quân liên tiếp hơn.
                                            </li>
                                        </ul>
                                    </div>
                                    <img
                                        src={step2}
                                        alt=""
                                        className="rounded-lg"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-x-6">
                                    <img
                                        src={step3}
                                        alt=""
                                        className="rounded-lg"
                                    />
                                    <div className="text-justify">
                                        <div className="float-left px-3 text-5xl font-bold text-center">
                                            3
                                        </div>
                                        <b>Phản ứng với nước đi của đối thủ.</b>{" "}
                                        Sau khi bạn thực hiện một nước đi với
                                        quân cờ của mình, đối thủ sẽ có lượt đi.
                                        Khi lên kế hoạch cho từng nước đi, hãy
                                        cố gắng tưởng tượng đối thủ sẽ phản ứng
                                        như thế nào. Điều đó giúp bạn phản ứng
                                        nhanh và quyết đoán trước các nước đi
                                        của họ. Trước khi thả một quân cờ vào
                                        bảng, hãy tự hỏi bạn sẽ làm gì tiếp theo
                                        nếu đối thủ thực hiện chính nước đi mà
                                        bạn sắp làm.
                                        <ul className="pl-4 mt-4 space-y-2 list-disc">
                                            <li>
                                                Nếu bạn đi trước, đối thủ thường
                                                sẽ phản ứng với các nước đi của
                                                bạn và cố gắng chặn bạn không
                                                tạo được bốn quân liên tiếp.
                                            </li>
                                            <li>
                                                Nếu bạn đi sau, bạn thường sẽ ở
                                                thế phòng thủ, cố gắng ngăn đối
                                                thủ xếp được bốn quân cờ liên
                                                tiếp.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col">
                <img src={logo} className="w-150" />
                <div className="flex items-center justify-center mb-8">
                    <div className="mr-4">
                        <button
                            onClick={() => setGameMode(0)}
                            className={`p-6 m-6 mb-4 bg-gray-500 rounded-lg cursor-pointer shadow-2xl transition-all duration-200 ${gameMode === 0 ? "bg-green-500" : "hover:bg-gray-400"}`}
                        >
                            <Users size={30} />
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
                            className={`p-6 m-6 mb-4 bg-gray-500 rounded-lg cursor-pointer shadow-2xl transition-all duration-200 ${gameMode === 1 ? "bg-green-500" : "hover:bg-gray-400"}`}
                        >
                            <Bot size={30} />
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
                        <p className="w-full text-center mb-3 font-semibold text-lg">
                            Độ mạnh AI
                        </p>
                        <div className="w-full flex justify-center">
                            {DEPTH_OPTIONS.map((value, index) => (
                                <button
                                    onClick={() => setMaxDepth(value)}
                                    key={index}
                                    className={`px-6 py-2 bg-gray-800 text-lg font-medium cursor-pointer transition-all duration-200 ${maxDepth === value ? "bg-green-500" : "hover:bg-gray-700"} ${index === 0 ? "rounded-l-lg border-r border-gray-700" : index === DEPTH_OPTIONS.length - 1 ? "rounded-r-lg" : "border-r border-gray-700"}`}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                        <p className="w-full text-center mb-3 mt-8 font-semibold text-lg">
                            Chọn thứ tự chơi
                        </p>
                        <div className="w-full flex justify-center">
                            <button
                                onClick={() => setPlayerPiece(1)}
                                className={`px-6 py-2 min-w-30 bg-gray-800 text-lg font-medium cursor-pointer transition-all duration-200 rounded-l-lg ${playerPiece === 1 ? "bg-red-500" : "hover:bg-gray-700"}`}
                            >
                                Đi trước
                            </button>
                            <button
                                onClick={() => setPlayerPiece(2)}
                                className={`px-6 py-2 min-w-30 bg-gray-800 text-lg font-medium cursor-pointer transition-all duration-200 rounded-r-lg ${playerPiece === 2 ? "bg-yellow-500" : "hover:bg-gray-700"}`}
                            >
                                Đi sau
                            </button>
                        </div>
                    </div>
                )}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => navigate("/game")}
                        className="px-12 py-4 bg-green-500 rounded-lg font-semibold text-2xl cursor-pointer shadow-2xl hover:bg-green-400 transition-colors duration-200"
                    >
                        Bắt đầu
                    </button>
                    <button
                        onClick={() => setHowToPlay(true)}
                        className="p-4 ml-2 bg-gray-600 rounded-lg cursor-pointer shadow-2xl hover:bg-gray-500 transition-colors duration-200"
                    >
                        <CircleQuestionMark size={30} />
                    </button>
                </div>
            </div>
        </div>
    );
};
