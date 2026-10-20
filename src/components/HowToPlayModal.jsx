import React from "react";
import { X, BookOpen, Target, Lightbulb } from "lucide-react";
import step1 from "../assets/step1.jpg";
import step2 from "../assets/step2.jpg";
import step3 from "../assets/step3.jpg";
import hint1 from "../assets/hint1.jpg";
import hint2 from "../assets/hint2.jpg";

export const HowToPlayModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 sticky top-0 z-10">
                    <div className="flex items-center gap-2 text-white">
                        <BookOpen size={22} className="text-emerald-400" />
                        <h2 className="text-xl font-bold">Hướng dẫn & Luật chơi Connect 4</h2>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Đóng"
                        className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content body */}
                <div className="p-4 sm:p-6 space-y-8 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 text-slate-300">
                    {/* Section 1: Rules */}
                    <div>
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg mb-4">
                            <Target size={20} />
                            <span>Luật chơi cơ bản</span>
                        </div>

                        <div className="space-y-6">
                            {/* Step 1 */}
                            <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
                                <img
                                    src={step1}
                                    alt="Mục tiêu trò chơi"
                                    className="w-full md:w-56 h-auto rounded-xl object-cover shadow-md"
                                />
                                <div className="text-sm space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                                            1
                                        </span>
                                        <h4 className="font-bold text-white text-base">
                                            Mục tiêu trò chơi
                                        </h4>
                                    </div>
                                    <p className="leading-relaxed">
                                        Để chiến thắng, người chơi phải là người đầu tiên xếp được <b>4 quân cờ cùng màu</b> thành một hàng thẳng.
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 text-slate-400 text-xs pl-1">
                                        <li>Theo hàng ngang (Horizontal)</li>
                                        <li>Theo hàng dọc (Vertical)</li>
                                        <li>Theo đường chéo (Diagonal)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
                                <img
                                    src={step2}
                                    alt="Thực hiện nước đi"
                                    className="w-full md:w-56 h-auto rounded-xl object-cover shadow-md"
                                />
                                <div className="text-sm space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                                            2
                                        </span>
                                        <h4 className="font-bold text-white text-base">
                                            Cách thả quân cờ
                                        </h4>
                                    </div>
                                    <p className="leading-relaxed">
                                        Hai bên lần lượt chọn một trong <b>7 cột</b> để thả quân cờ. Quân cờ sẽ rơi tự do xuống hàng trống thấp nhất của cột đó.
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        Không thể thả quân vào cột đã đầy (đủ 6 quân). Khi toàn bộ 42 ô đều đầy mà chưa có ai tạo được 4 quân liên tiếp thì trận đấu kết thúc với kết quả Hòa.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
                                <img
                                    src={step3}
                                    alt="Chiến thuật phòng thủ & tấn công"
                                    className="w-full md:w-56 h-auto rounded-xl object-cover shadow-md"
                                />
                                <div className="text-sm space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                                            3
                                        </span>
                                        <h4 className="font-bold text-white text-base">
                                            Tấn công & Phòng thủ
                                        </h4>
                                    </div>
                                    <p className="leading-relaxed">
                                        Quan sát kỹ nước đi của đối thủ. Luôn kiểm tra xem đối phương có cơ hội tạo chuỗi 3 quân hay không để kịp thời chặn lại.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Strategy Tips */}
                    <div>
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-4">
                            <Lightbulb size={20} />
                            <span>Mẹo & Chiến thuật cao cấp</span>
                        </div>

                        <div className="space-y-6">
                            {/* Tip 1 */}
                            <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
                                <img
                                    src={hint1}
                                    alt="Kiểm soát cột giữa"
                                    className="w-full md:w-56 h-auto rounded-xl object-cover shadow-md"
                                />
                                <div className="text-sm space-y-2">
                                    <h4 className="font-bold text-white text-base">
                                        Kiểm soát cột trung tâm (Cột số 4)
                                    </h4>
                                    <p className="leading-relaxed">
                                        Cột trung tâm là vị trí chiến lược nhất bàn cờ. Quân cờ ở cột giữa có thể tham gia vào nhiều đường nối (ngang, dọc, cả hai đường chéo) hơn bất kỳ cột nào khác.
                                    </p>
                                </div>
                            </div>

                            {/* Tip 2 */}
                            <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
                                <img
                                    src={hint2}
                                    alt="Tạo bẫy 2 đầu"
                                    className="w-full md:w-56 h-auto rounded-xl object-cover shadow-md"
                                />
                                <div className="text-sm space-y-2">
                                    <h4 className="font-bold text-white text-base">
                                        Tạo thế bẫy 2 đầu (Double Threat)
                                    </h4>
                                    <p className="leading-relaxed">
                                        Cố gắng tạo ra chuỗi 3 quân mở ở cả 2 đầu hoặc 2 mối đe dọa cùng lúc. Đối phương chỉ có thể chặn 1 ô, ô còn lại sẽ giúp bạn chiến thắng!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-800 flex justify-end bg-slate-900/90">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm cursor-pointer shadow-md transition-all active:scale-95"
                    >
                        Đã hiểu, sẵn sàng chơi!
                    </button>
                </div>
            </div>
        </div>
    );
};
