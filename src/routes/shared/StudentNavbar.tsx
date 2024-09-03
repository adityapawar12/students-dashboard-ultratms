import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";

function StudentNavbar() {
  return (
    <section className="navbar w-full h-14">
      <div className="w-full xl:w-5/6 2xl:w-4/6 mx-auto px-0 py-4">
        <form className="flex w-full max-w-sm items-center space-x-2">
          <Sheet>
            <SheetTrigger className="block md:hidden">
              <Menu className="text-[#707FDD]" />
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0 m-0 w-72">
              <SideNav />
            </SheetContent>
          </Sheet>{" "}
          <Link to={"/students"}>
            <Button
              className="bg-[#707FDD] hover:bg-[#7f8ce4] text-white p-0 px-4"
              type="submit"
            >
              <ArrowLeft size={14} className="p-0 m-0 mr-2" /> Go Back
            </Button>
          </Link>
        </form>
      </div>
    </section>
  );
}

export default StudentNavbar;
