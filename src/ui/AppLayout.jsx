import { Outlet } from "react-router-dom";
import Header from "./Header";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import Sidebar from "./Sidebar";

function AppLayout() {
  const [isNav, setIsNav] = useLocalStorageState(false, "isOpenNav");
  function handleClick() {
    setIsNav((isNav) => !isNav);
  }
  return (
    <div
      className={`md:grid md:h-full ${
        isNav ? "md:grid-cols-[15rem_1fr]" : "md:grid-cols-[4rem_1fr]"
      } `}
    >
      <Sidebar onChangeNav={handleClick} isOpenNav={isNav} />
      <main className="mx-auto w-full h-screen overflow-auto scrollbar-stable bg-bg">
        <Header />
        <section className="px-2 sm:px-5 overflow-x-scroll ">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
export default AppLayout;
