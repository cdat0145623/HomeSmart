// @ts-nocheck
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

let AOS_INITED = false;

/**
 * AnimationWrapper: bọc nội dung và gán hiệu ứng AOS theo props.
 * Props:
 *  - type: "fade-up" | "fade" | "fade-left" | "fade-right" | "zoom-in" | ...
 *  - delay: số ms trì hoãn
 *  - duration: số ms thời gian hiệu ứng
 *  - once: chạy 1 lần (mặc định true)
 *  - offset: px để kích hoạt
 *  - anchor: selector neo hiệu ứng (tuỳ chọn)
 *  - className: thêm class CSS
 */
const AnimationWrapper = ({
children,
type = "fade-up",
delay = 0,
duration = 600,
once = false,
offset = 60,
anchor,
className = "",
}) => {
useEffect(() => {
    if (!AOS_INITED) {
    AOS.init({
        duration,
        once,
        offset,
        easing: "ease-out",
    });
    AOS_INITED = true;
    } else {
    AOS.refresh();
    }
}, []);

const attrs = {
    "data-aos": type,
    "data-aos-delay": delay,
    "data-aos-duration": duration,
    "data-aos-once": once,
    "data-aos-offset": offset,
};
if (anchor) attrs["data-aos-anchor"] = anchor;

return (
    <div className={className} {...attrs}>
    {children}
    </div>
);
};

export default AnimationWrapper;
