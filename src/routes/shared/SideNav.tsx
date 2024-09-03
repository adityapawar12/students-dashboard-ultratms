import { LayoutDashboard, User } from "lucide-react";
import NavLink from "./NavLink";

function SideNav() {
  return (
    <section className="side-navbar w-72 md:w-20 lg:w-72 h-screen bg-[#D1D3E2] ">
      <div className="text-[#5A67BA] w-full py-4 px-4 lg:px-6 font-semibold text-xl flex flex-row justify-start items-center gap-2">
        <div className="bg-[#5A67BA] text-white font-poppins rounded-full w-10 h-10 flex justify-center items-center">
          S
        </div>
        <span className="font-poppins block md:hidden lg:block">Dashboard</span>
      </div>

      <div className="flex flex-col justify-between h-[calc(100vh-72px)] pt-4">
        <div>
          <NavLink title={"Home"} href={"/"}>
            <LayoutDashboard />
          </NavLink>

          <NavLink title={"Students"} href={"/students"}>
            <User />
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default SideNav;
