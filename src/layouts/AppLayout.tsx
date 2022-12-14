import {Navbar} from "../ui";
import {Outlet} from "react-router-dom";

export const AppLayout = () => {
  return (
    <>
        <nav>
            <Navbar/>
        </nav>
        <main style={{
            height: 'fit-content',
        }}>
            <Outlet />
        </main>
    </>
  );
};
