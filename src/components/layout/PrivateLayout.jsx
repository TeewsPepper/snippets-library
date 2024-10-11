
import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import PrivateHeader from "../PrivateHeader";
import "./PrivateLayout.css"

const PrivateLayout = () => {
  return (
    <>
      <div className="layout">
        <PrivateHeader />
        <main className="content">
          <Outlet /> {/* Aquí irá el contenido de las rutas */}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PrivateLayout;
