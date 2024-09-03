import { ScrollArea } from "@/components/ui/scroll-area";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LayoutGrid, Rows3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StudentInterface } from "../students/StudentsPage";
import { useState } from "react";
import StudentVertical from "./StudentVertical";
import StudentHorizontal from "./StudentHorizontal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Students({
  students,
  studentsIsPending,
  studentsIsError,
  isDashboard,
}: {
  students: Array<StudentInterface>;
  studentsIsPending: boolean;
  studentsIsError: boolean;
  isDashboard: boolean;
}) {
  const [view, setView] = useState<string>("grid");

  return (
    <>
      <div className="flex flex-row justify-between items-center px-6 py-4 w-full xl:w-5/6 2xl:w-4/6 mx-auto">
        <h2 className="font-poppins font-semibold text-2xl text-black">
          Students
        </h2>

        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(val) => {
            if (val === "list") {
              setView("list");
            } else if (val === "grid") {
              setView("grid");
            }
          }}
          className="bg-white rounded-xl"
        >
          <ToggleGroupItem
            value="grid"
            className="data-[state=on]:bg-[#707FDD] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-black rounded-s-xl rounded-e-none"
            aria-label="Toggle Grid"
          >
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>

          <ToggleGroupItem
            className="data-[state=on]:bg-[#707FDD] data-[state=on]:text-white data-[state=off]:bg-white data-[state=off]:text-black rounded-s-none rounded-e-xl"
            value="list"
            aria-label="Toggle List"
          >
            <Rows3 className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <ScrollArea className={"h-[calc(100vh-8rem)]"} scrollHideDelay={2000}>
        {studentsIsPending && (
          <div className="w-full xl:w-5/6 2xl:w-4/6 mx-auto p-6">
            Loading...
          </div>
        )}

        {studentsIsError && (
          <div className="w-full xl:w-5/6 2xl:w-4/6 mx-auto p-6">
            Something went wrong...
          </div>
        )}
        <section>
          <ul
            className={cn(
              view === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full xl:w-5/6 2xl:w-4/6 mx-auto p-6 pt-2"
                : "grid grid-cols-1 gap-4 w-full xl:w-5/6 2xl:w-4/6 mx-auto p-6"
            )}
          >
            {students &&
              students.length > 0 &&
              students.map((student: StudentInterface) => (
                <li key={student.id}>
                  {view === "grid" ? (
                    <StudentVertical student={student} />
                  ) : (
                    <StudentHorizontal student={student} />
                  )}
                </li>
              ))}

            {!studentsIsPending &&
              !studentsIsError &&
              students.length === 0 && (
                <div className="h-20 w-full text-2xl text-center flex justify-center items-center">
                  <h2>No Students found</h2>
                </div>
              )}
          </ul>
        </section>
        {!studentsIsPending && !studentsIsError && isDashboard && (
          <div className="flex flex-row justify-center items-center px-6 py-4 w-full xl:w-5/6 2xl:w-4/6 mx-auto">
            <Link to={"/students"}>
              <Button
                className="bg-[#707FDD] hover:bg-[#7f8ce4] text-white p-0 px-4"
                type="submit"
              >
                View All Students
              </Button>
            </Link>
          </div>
        )}
      </ScrollArea>
    </>
  );
}

export default Students;
