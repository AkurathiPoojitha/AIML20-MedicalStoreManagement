import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <Navbar />

      <div
        className="container-fluid"
        style={{
          marginLeft: "250px",
          marginTop: "90px",
          width: "calc(100% - 250px)",
          padding: "20px"
        }}
      >
        {children}
      </div>
    </>
  );
}

export default Layout;