import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

function NavLink({
  children,
  title,
  href,
}: {
  children: React.ReactNode;
  title: string;
  href: string;
}) {
  const location = useLocation();

  return (
    <Link to={href}>
      <div className="text-[#5A67BA] w-full py-1 px-4 lg:px-6 font-semibold text-lg">
        <div
          className={cn(
            location.pathname === href
              ? "flex flex-row justify-start items-center gap-2 px-2 rounded-md py-2 bg-[#c2c4e4]"
              : "flex flex-row justify-start items-center gap-2 px-2 group rounded-md py-2 hover:bg-[#c2c4e4]"
          )}
        >
          <div
            className={cn(
              location.pathname === href
                ? "text-white bg-[#707FDD] rounded font-poppins w-7 h-7 flex justify-center items-center"
                : "group-hover:text-white group-hover:bg-[#707FDD] rounded font-poppins w-7 h-7 flex justify-center items-center"
            )}
          >
            {children}
          </div>
          <span className="font-poppins block md:hidden lg:block">{title}</span>
        </div>
      </div>
    </Link>
  );
}

export default NavLink;
