import Header from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import "./Layout.css"

const Layout = () => {
  return (
    <>
      <div className="layout">
        <Header />
        <main className="content">
          <Outlet /> {/* Aquí irá el contenido de las rutas */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
