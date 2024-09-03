import { useState } from "react";
import SideNav from "../shared/SideNav";
import Students from "../shared/Students";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "../shared/Navbar";

export interface StudentInterface {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: {
    city: string;
    country: string;
    street: string;
    zip: string;
  };
  email: string;
  phone: string;
  courses: Array<string>;
  gpa: number;
  image: string;
}

function StudentsPage() {
  const [studentsData, setStudentsData] = useState<Array<StudentInterface>>([]);

  const { isPending: studentsIsPending, isError: studentsIsError } = useQuery({
    queryKey: ["data"],
    queryFn: () =>
      axios
        .get("https://freetestapi.com/api/v1/students")
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

        {studentsData && (
          <Students
            students={studentsData}
            studentsIsError={studentsIsError}
            studentsIsPending={studentsIsPending}
            isDashboard={false}
          />
        )}
      </section>
    </div>
  );
}

export default StudentsPage;
