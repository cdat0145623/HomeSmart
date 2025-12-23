import { useEffect, useState } from "react";
import { product as getData } from "../services/productService";

function useFetch(slug, limit, options = "all") {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        try {
            const fetchAPI = async () => {
                setLoading(true);
                const result = await getData(
                    `${slug}?limit=${limit}&options=${options}`
                );
                // console.log("result useFetch::", result);
                setData(result);
                setLoading(false);
            };
            fetchAPI();
        } catch (error) {
            console.warn("ERROR AT CLIENT USEFETCH: ", error);
            setError(error);
        }
    }, [slug, limit, options]);

    return { data, loading, error };
}

export default useFetch;
