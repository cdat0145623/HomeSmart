import { IconStar } from "../../assets/Icon/Icon";
import "./evaluate.css";

function Evaluate() {
    // className="min-w-[120px] bg-[#eae0c5] p-4 rounded-md mx-auto"
    return (
        <div className="col-span-full bg-[#eae0c5] p-4 rounded-md">
            <h1 className="mb-4">Đánh giá iPhone Air 256GB | Chính hãng</h1>
            <div className="px-6 py-12 bg-white rounded-md">
                <div className="flex justify-between">
                    <div className="flex flex-col w-1/4">
                        <div className="flex justify-center items-center">
                            <span className="text-5xl font-bold">5.0</span>
                            <span className="text-4xl text-slate-300">/</span>
                            <span className="text-3xl text-slate-300">5</span>
                        </div>
                        <div className="flex justify-center my-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <IconStar key={i} />
                            ))}
                        </div>
                        <div className="flex justify-center">
                            3 lượt đánh giá
                        </div>
                    </div>
                    <div className="flex w-1/2 flex-wrap">
                        <div className="flex w-full justify-between ">
                            <div className="flex justify-center">
                                <span className="mr-1">1</span>
                                <IconStar />
                            </div>
                            <div className="flex-1 w-full mx-3">
                                <progress
                                    max="3"
                                    className="w-full progress-warning"
                                    value="3"
                                ></progress>
                            </div>
                            <div className="flex justify-center">
                                <span>3</span>
                                <span className="ml-1">đánh giá</span>
                            </div>
                        </div>
                        <div className="flex w-full justify-between">
                            <div className="flex justify-center">
                                <span className="mr-1">1</span>
                                <IconStar />
                            </div>
                            <div className="flex-1 w-full mx-3">
                                <progress
                                    max="3"
                                    className="w-full progress-warning"
                                    value="3"
                                ></progress>
                            </div>
                            <div className="flex justify-center">
                                <span>3</span>
                                <span className="ml-1">đánh giá</span>
                            </div>
                        </div>
                        <div className="flex w-full justify-between">
                            <div className="flex justify-center">
                                <span className="mr-1">1</span>
                                <IconStar />
                            </div>
                            <div className="flex-1 w-full mx-3">
                                <progress
                                    max="3"
                                    className="w-full progress-warning"
                                    value="3"
                                ></progress>
                            </div>
                            <div className="flex justify-center">
                                <span>3</span>
                                <span className="ml-1">đánh giá</span>
                            </div>
                        </div>
                        <div className="flex w-full justify-between">
                            <div className="flex justify-center">
                                <span className="mr-1">1</span>
                                <IconStar />
                            </div>
                            <div className="flex-1 w-full mx-3">
                                <progress
                                    max="3"
                                    className="w-full progress-warning"
                                    value="3"
                                ></progress>
                            </div>
                            <div className="flex justify-center">
                                <span>3</span>
                                <span className="ml-1">đánh giá</span>
                            </div>
                        </div>
                        <div className="flex w-full justify-between">
                            <div className="flex justify-center">
                                <span className="mr-1">1</span>
                                <IconStar />
                            </div>
                            <div className="flex-1 w-full mx-3">
                                <progress
                                    max="3"
                                    className="w-full progress-warning"
                                    value="3"
                                ></progress>
                            </div>
                            <div className="flex justify-center">
                                <span>3</span>
                                <span className="ml-1">đánh giá</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Chia sẻ nhận xét về sản phẩm</h2>
                        <button>Đánh giá sản phẩm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Evaluate;
