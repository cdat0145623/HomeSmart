import { Outlet } from "react-router-dom";

function AdminWrapper() {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminWrapper;
