const pool = require("../config/db");
// exports.search = async (req, res) => {
//     try {
//         const { keyword } = req.query;

//         // Ví dụ query MySQL
//         const sql = "SELECT * FROM products WHERE name LIKE ?";
//         const searchTerm = `%${keyword}%`; // Thêm % để tìm gần đúng

//         db.query(sql, [searchTerm], (err, results) => {
//             if (err) throw err;
//             res.json(results); // Trả về mảng kết quả
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Lỗi Server" });
//     }
// };

exports.search = async (req, res) => {
    try {
        const keyword = req.query.q?.trim();
        console.log("keyword:::", keyword);

        if (!keyword) {
            return res.json([]);
        }

        const [products] = await pool.query(
            `SELECT * FROM san_pham WHERE ten_san_pham LIKE ? ORDER BY ngay_tao DESC`,
            [`%${keyword}%`]
        );
        console.log("search product::", products);

        res.status(200).json(products);
    } catch (error) {
        console.log("error search controlellel:::::", error);
    }
};
