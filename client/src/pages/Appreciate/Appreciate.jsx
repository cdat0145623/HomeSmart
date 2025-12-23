import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import httpRequest from "../../utils/httpRequest";

function Appreciate({ product }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (!product?.id) return;
        loadReviews(product.id);
    }, [product?.id]);

    const submitReview = async () => {
        console.log("appreciate product:", product);
        if (!rating) {
            toast.error("Hãy chọn số sao!");
            return;
        }
        if (!comment.trim()) {
            toast.error("Vui lòng nhập nội dung đánh giá");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Bạn chưa đăng nhập!");
            return;
        }

        try {
            const res = await httpRequest.post(
                "/api/reviews/create",
                {
                    productId: product.id,
                    rating: rating,
                    comment: comment,
                },
                { withCredentials: true }
            );
            console.log("res reviews::", res);

            toast.success("Đánh giá thành công");
            loadReviews(product.id);
            setRating(0);
            setComment("");
        } catch (err) {
            console.error("Lỗi submit:", err.response?.data || err);
            toast.error(err.response?.data?.message || "Lỗi khi gửi đánh giá");
        }
    };

    const loadReviews = async (productId) => {
        if (!productId) return;
        try {
            const res = await httpRequest.get(`/api/reviews/${productId}`);
            if (res.data && res.data.reviews) setReviews(res.data.reviews);
            else setReviews([]);
        } catch (err) {
            console.error("Lỗi load reviews:", err);
            setReviews([]);
        }
    };
    return (
        <>
            <div style={{ marginTop: 20 }}>
                <div
                    className="text-xl border-b-2 border-[#C9AC68] inline-block pb-2 mb-4"
                    style={{ marginBottom: 8, fontWeight: 700 }}
                >
                    Viết đánh giá
                </div>
                <div>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <span
                            key={num}
                            onClick={() => setRating(num)}
                            style={{
                                fontSize: 28,
                                color: num <= rating ? "#FFD700" : "#ccc",
                                cursor: "pointer",
                                marginRight: 6,
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Hãy chia sẻ cảm nhận của bạn..."
                    className="border p-3 w-full rounded"
                    style={{ marginTop: 12 }}
                />

                <div style={{ marginTop: 8 }}>
                    <button
                        onClick={submitReview}
                        className="mt-3 px-4 py-2 bg-orange-500 text-white rounded"
                    >
                        Gửi đánh giá
                    </button>
                </div>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-bold border-b-2 border-[#C9AC68] inline-block pb-2 mb-4">
                    Đánh giá sản phẩm
                </h3>

                {reviews.length === 0 && <p>Chưa có đánh giá nào</p>}

                {reviews.length > 0 &&
                    reviews.map((r) => (
                        <div key={r.id} className="border-b py-3">
                            <div className="font-semibold">{r.user_name}</div>

                            <div style={{ color: "#f6c945", fontSize: 20 }}>
                                {"★".repeat(r.rating)}
                                {"☆".repeat(5 - r.rating)}
                            </div>

                            <div>{r.comment}</div>

                            <div className="text-gray-500 text-sm">
                                {new Date(r.created_at).toLocaleDateString(
                                    "vi-VN"
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Appreciate;
