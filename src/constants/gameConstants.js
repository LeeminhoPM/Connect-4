export const DIFFICULTY_LEVELS = [
    { id: "easy", name: "Dễ", depth: 2, stars: "★☆☆☆", desc: "Thích hợp cho người mới bắt đầu" },
    { id: "medium", name: "Trung bình", depth: 4, stars: "★★☆☆", desc: "Cân bằng, phản xạ tốt" },
    { id: "hard", name: "Khó", depth: 5, stars: "★★★☆", desc: "Chiến thuật sâu, ít sai lầm" },
    { id: "expert", name: "Cao thủ", depth: 6, stars: "★★★★", desc: "Tính toán 6 nước đi, cực kỳ thử thách" },
];

export const STORAGE_KEYS = {
    SCORES: "connect4_scores_v2",
    SETTINGS: "connect4_settings_v2",
};

export const DEFAULT_SCORES = {
    p1: 0,
    p2: 0,
    ai: 0,
    draws: 0,
    streak: 0,
};
