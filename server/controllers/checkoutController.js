const {
    VNPay,
    ignoreLogger,
    ProductCode,
    VnpLocale,
    dateFormat,
} = require("vnpay");
const axios = require("axios");
const pool = require("../config/db");

const beginTransactionVnpay = async (req, res) => {
    const order = res.locals.newOrder;
    console.log("new order:::", order);

    const vnpay = new VNPay({
        tmnCode: "9TN3Q3R2",
        secureSecret: "YY8IRJFXAJ7ML9LC16DR7PYEZXXVR8F7",
        vnpayHost: "https://sandbox.vnpayment.vn",
        testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
        hashAlgorithm: "SHA512", // tùy chọn
        enableLog: true, // tùy chọn
        loggerFn: ignoreLogger, // tùy chọn
    });

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const paymentUrl = vnpay.buildPaymentUrl({
        vnp_Amount: order?.total,
        vnp_IpAddr: "127.0.0.1",
        vnp_TxnRef: `${order?.order_code}`,
        vnp_OrderInfo: `Thanh toan don hang ${order?.order_code}`,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: "http://localhost:5001/api/checkout/check-payment-vnpay",
        vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
        vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là thời gian hiện tại
        vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
    });
    res.status(200).json({ paymentUrl });

    // res.status(200).json(paymentUrl);
};

const checkPaymentWithVNPay = async (req, res) => {
    console.log("req?.query vnpay: ", req?.query);
    try {
        if (req?.query?.vnp_ResponseCode === "00") {
            const [order] = await pool.query(
                `SELECT * FROM don_hang WHERE ma_don = ?`,
                [req.query.vnp_TxnRef]
            );
            console.log(order);
            const query = `UPDATE don_hang SET trang_thai_thanh_toan = ? WHERE ma_don = ?`;
            await pool.execute(query, [1, order[0].ma_don]);
            return res.redirect(
                `http://localhost:5173/cart/checkout/order-success?order-code=${order[0]?.ma_don}`
            );
            res.status(200).json({
                ok: true,
                message: "Giao dịch thành công qua VNPAY",
                order: order[0],
            });
        } else if (req?.query?.vnp_ResponseCode === "24") {
            res.status(404).json({
                ok: false,
                message: "Thanh toán không thành công vì huỷ giao dịch!!!",
            });
        }
        res.status(200).json({ message: "Ngoài 2 điều kiện" });
    } catch (error) {
        console.log("ERROR at checkout controller:", error);
    }
};

const createQrMoMo = async (req, res) => {
    const order = res.locals.newOrder;
    console.log("new order:::", order);

    var accessKey = "F8BBA842ECF85";
    var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var orderInfo = `Thanh toan don hang ${order?.order_code}`;
    var partnerCode = "MOMO";
    var redirectUrl = "http://localhost:5001/api/checkout/check-payment-momo";
    var ipnUrl = "http://localhost:5001/api/checkout/check-payment-momo";
    var requestType = "payWithMethod";
    var amount = order.total;
    // var orderId = partnerCode + new Date().getTime();
    var orderId = `${order.order_code}`;
    var requestId = orderId;
    var extraData = "";
    var paymentCode =
        "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==";
    var orderGroupId = "";
    var autoCapture = true;
    var lang = "vi";

    var rawSignature =
        "accessKey=" +
        accessKey +
        "&amount=" +
        amount +
        "&extraData=" +
        extraData +
        "&ipnUrl=" +
        ipnUrl +
        "&orderId=" +
        orderId +
        "&orderInfo=" +
        orderInfo +
        "&partnerCode=" +
        partnerCode +
        "&redirectUrl=" +
        redirectUrl +
        "&requestId=" +
        requestId +
        "&requestType=" +
        requestType;
    //signature
    const crypto = require("crypto");
    var signature = crypto
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest("hex");

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature,
    });
    //Create the HTTPS objects
    const https = require("https");
    const options = {
        hostname: "test-payment.momo.vn",
        port: 443,
        path: "/v2/gateway/api/create",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody),
        },
    };
    //Send the request and get the response
    const response = await axios.post(
        "https://test-payment.momo.vn/v2/gateway/api/create",
        requestBody,
        {
            headers: {
                "Content-Type": "application/json",
            },
            // withCredentials: true,
        }
    );

    res.status(200).json(response.data.payUrl);
};

const checkPaymentWithMoMo = async (req, res) => {
    console.log("req?.query vnpay: ", req?.query);
    const con = await pool.getConnection();
    try {
        await con.beginTransaction();
        if (req?.query?.resultCode === "0") {
            const [order] = await con.query(
                `SELECT * FROM don_hang WHERE ma_don = ?`,
                [req.query.orderId]
            );
            console.log(order);
            const query = `UPDATE don_hang SET trang_thai_thanh_toan = ? WHERE ma_don = ?`;
            await con.execute(query, [1, order[0].ma_don]);
            await con.commit();
            return res.redirect(
                `http://localhost:5173/cart/checkout/order-success?order-code=${order[0]?.ma_don}`
            );
            res.status(200).json({
                ok: true,
                message: "Giao dịch thành công qua VNPAY",
                order: order[0],
            });
        } else if (req?.query?.resultCode === "1006") {
            res.status(404).json({
                ok: false,
                message: "Thanh toán không thành công vì huỷ giao dịch!!!",
            });
        }
        res.status(200).json({ message: "Ngoài 2 điều kiện" });
    } catch (error) {
        await con.rollback();
        console.log("ERROR at checkout controller:", error);
    } finally {
        con.release();
    }
    res.status(200).json({
        ok: true,
        message: "Thanh toán thành công Ví MOMO",
    });
};

module.exports = {
    beginTransactionVnpay,
    checkPaymentWithVNPay,
    createQrMoMo,
    checkPaymentWithMoMo,
};
