import HeadlessTippy from "@tippyjs/react/headless";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../customHooks/useDebounce";
import {
    faCircleXmark,
    faMagnifyingGlass,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import * as searchService from "../services/searchService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/Header.css";
import SearchResult from "./SearchResult";

function Search({ showSearch, setShowSearch }) {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const debouncedValue = useDebounce(searchValue, 500);
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchService.search(debouncedValue);
            console.log("result", result);
            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue("");
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(" ")) {
            setSearchValue(searchValue);
        }
    };

    return (
        <div className={`search-overlay ${showSearch ? "is-open" : ""}`}>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                placement="bottom"
                content="Tìm kiếm"
                render={(attrs) => (
                    <div
                        // className={cx("search-result")}
                        className="bg-slate-100 min-w-[520px] max-w-[520px]"
                        tabIndex="-1"
                        {...attrs}
                    >
                        <h4 className="bg-slate-200 p-2 text-sm font-bold">
                            Sản phẩm gợi ý
                        </h4>
                        {searchResult.map((result) => (
                            <SearchResult key={result?.id} data={result} />
                        ))}
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div
                    className="search-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Search"
                >
                    <form
                        className="search-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <input
                            ref={inputRef}
                            value={searchValue}
                            className="search-input"
                            type="text"
                            placeholder="Nhập từ khóa tìm kiếm…"
                            autoFocus
                            onFocus={() => setShowResult(true)}
                            onChange={handleChange}
                        />
                        {!!searchValue && !loading && (
                            <button onClick={() => handleClear()}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                        {loading && <FontAwesomeIcon icon={faSpinner} />}
                        <button
                            className="search-overlay-submit"
                            type="submit"
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            <div className="flex items-center justify-between">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                <p>Tìm kiếm</p>
                            </div>
                        </button>
                        <button
                            type="button"
                            className="search-close-inline"
                            onClick={() => setShowSearch(false)}
                        >
                            Đóng
                        </button>
                    </form>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
