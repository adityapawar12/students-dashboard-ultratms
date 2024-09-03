import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SideNav from "@/routes/shared/SideNav";
import { StudentInterface } from "../StudentsPage";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import StudentNavbar from "@/routes/shared/StudentNavbar";

function StudentsPage() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState<StudentInterface | null>(null);

  const { isPending: studentIsPending, isError: studentIsError } = useQuery({
    queryKey: ["data"],
    queryFn: () =>
      axios
        .get(`https://freetestapi.com/api/v1/students/${id}`)
        .then((response) => {
          setStudentData(response.data);
          return response.data;
        })
        .catch((error) => error),
  });

  return (
    <div className="flex flex-row justify-start items-start">
      <div className="max-md:hidden">
        <SideNav />
      </div>

      <section className="bg-[#f5f7fb] w-full md:w-[calc(100vw-5rem)] lg:w-[calc(100vw-18rem)] h-screen flex flex-col items-start px-6">
        <StudentNavbar />

        {studentIsPending && <>Loading...</>}

        {studentIsError && <>There was an error fetching user info</>}

        {studentData && (
          <Card className="border-0 h-auto w-full xl:w-5/6 2xl:w-4/6 mx-auto flex flex-col mt-4">
            <CardHeader className="flex flex-col justify-start items-start h-full p-4">
              <div className="flex justify-center items-center mb-2 relative">
                <img
                  src={`/user-images/user-${
                    (studentData.id + 1) % 12 === 0
                      ? 12
                      : (studentData.id + 1) % 12
                  }.jpg`}
                  height={80}
                  width={80}
                  className="h-32 w-32 md:h-40 md:w-40 mr-4 rounded-full"
                />

                <div className="text-start">
                  <CardTitle className="pb-2">
                    {studentData.name}, {studentData.age}
                  </CardTitle>

                  <p className="break-all flex pb-1 flex-row items-center gap-1 justify-start">
                    <Phone className="text-[#707FDD]" size={16} />{" "}
                    {studentData.phone}
                  </p>
                  <p className="break-all flex pb-1 flex-row items-center gap-1 justify-start">
                    <Mail className="text-[#707FDD]" size={16} />{" "}
                    {studentData.email}
                  </p>
                  <p className="break-all flex pb-1 flex-row items-center gap-1 justify-start">
                    <GraduationCap className="text-[#707FDD]" size={16} />{" "}
                    {studentData.gpa} GPA
                  </p>

                  <div className="flex flex-row justify-start items-center gap-2">
                    {studentData.courses.map((course, index) => (
                      <Badge key={index} className="bg-[#5A67BA] text-white">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mb-2 relative">
                <div className="text-start">
                  <p className="break-all flex pb-1 flex-row items-center gap-1 justify-start">
                    Gender : {studentData.gender}
                  </p>
                  <p className="break-all flex pb-1 flex-row items-center gap-1 justify-start">
                    Address :{" "}
                    {`${studentData.address.city}, ${studentData.address.country}, ${studentData.address.city}, ${studentData.address.zip}`}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        )}
      </section>
    </div>
  );
}

export default StudentsPage;
