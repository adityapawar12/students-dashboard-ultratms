import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UseMutationResult } from "@tanstack/react-query";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideNav from "./SideNav";

function Navbar({
  mutation,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: UseMutationResult<any, Error, string, unknown>;
}) {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <section className="navbar w-full h-14">
      <div className="w-full xl:w-5/6 2xl:w-4/6 mx-auto px-6 py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(searchText);
          }}
          className="flex w-full max-w-sm items-center space-x-2"
        >
          <Sheet>
            <SheetTrigger className="block md:hidden">
              <Menu className="text-[#707FDD]" />
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0 m-0 w-72">
              <SideNav />
            </SheetContent>
          </Sheet>
          <Input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-[#8591dd]"
            placeholder="Search Student"
          />
          <Button
            className="bg-[#707FDD] hover:bg-[#7f8ce4] text-white p-0 px-4"
            type="submit"
          >
            <Search size={14} className="p-0 m-0" />
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Navbar;
