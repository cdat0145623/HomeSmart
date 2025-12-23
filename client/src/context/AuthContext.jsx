import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Khi ứng dụng được khởi động, kiểm tra xem có thông tin người dùng trong localStorage không
    useEffect(() => {
        console.log("useEffect of AUTHPROVIDER DC GOI");

        const savedUser = localStorage.getItem("user");
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (savedUser && storedUser) {
            setUser(JSON.parse(savedUser));
            // setToken(JSON.parse(savedToken));
        }
        setLoading(false);
    }, []);

    const update = (updatedUser) => {
        const userFromStorage = JSON.parse(localStorage.getItem("user"));
        const updatedUserInfo = { ...userFromStorage, ...updatedUser };
        localStorage.setItem("user", JSON.stringify(updatedUserInfo));
        setUser(updatedUserInfo);
    };

    // Hàm đăng nhập
    const login = (userData, token) => {
        localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("token", token); // Lưu token vào localStorage
        setUser(userData); // Cập nhật trạng thái người dùng
    };

    // Hàm đăng xuất
    const logout = async () => {
        localStorage.removeItem("user"); // Xóa thông tin người dùng khỏi localStorage
        localStorage.removeItem("token");
        setUser(null); // Xóa trạng thái người dùng
    };

    return (
        <AuthContext.Provider value={{ update, loading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
