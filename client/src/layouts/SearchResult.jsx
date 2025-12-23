import { Link } from "react-router-dom";
import { DOMAIN, formatPrice } from "../helper/helper";

function SearchResult({ data }) {
    console.log("data search result::", data);
    return (
        <Link to={`/${data?.duong_dan_ten_seo}`}>
            <div className="p-3 flex hover:bg-[#f0f0f0]">
                <img
                    className="h-[60px] w-[60px]"
                    src={`${DOMAIN + data?.anh_dai_dien}`}
                    alt={data?.ten_san_pham}
                />
                <div className="flex flex-col justify-center flex-1 text-sm ml-4">
                    <h3 className="font-bold">{data?.ten_san_pham}</h3>
                    <div className="flex ">
                        <p className="font-bold text-red-500 mr-4">
                            {formatPrice(data?.gia_khuyen_mai)}
                        </p>
                        <p className="text-sm font-normal text-slate-500 line-through">
                            {formatPrice(data?.gia_goc)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default SearchResult;
