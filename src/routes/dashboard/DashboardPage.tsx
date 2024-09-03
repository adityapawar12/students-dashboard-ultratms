import { useState } from "react";
import SideNav from "../shared/SideNav";
import Students from "../shared/Students";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StudentInterface } from "../students/StudentsPage";
import Navbar from "../shared/Navbar";

function DashboardPage() {
  const [studentsData, setStudentsData] = useState<Array<StudentInterface>>([]);

  const { isPending: studentsIsPending, isError: studentsIsError } = useQuery({
    queryKey: ["data"],
    queryFn: () =>
      axios
        .get("https://freetestapi.com/api/v1/students?limit=8")
        .then((response) => {
          setStudentsData(response.data);
          return response.data;
        })
        .catch((error) => error),
  });

  const mutation = useMutation({
    mutationFn: (studentName: string) => {
      return axios
        .get(`https://freetestapi.com/api/v1/students?search=${studentName}`)
        .then((response) => {
          setStudentsData(response.data);
          return response.data;
        })
        .catch((error) => error);
    },
  });

  return (
    <div className="flex flex-row justify-start items-start">
      <div className="max-md:hidden">
        <SideNav />
      </div>

      <section className="bg-[#f5f7fb] w-full md:w-[calc(100vw-5rem)] lg:w-[calc(100vw-18rem)] h-screen">
        <Navbar mutation={mutation} />

        <div>
          {studentsData && (
            <Students
              students={studentsData}
              studentsIsError={studentsIsError}
              studentsIsPending={studentsIsPending}
              isDashboard={true}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
