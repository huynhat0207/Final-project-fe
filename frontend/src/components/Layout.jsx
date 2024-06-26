import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

function Layout(currentPage) {
  return (
    <>
    <Header currentPage={currentPage}/>
    <Outlet/>
    </>
  )
}

export default Layout