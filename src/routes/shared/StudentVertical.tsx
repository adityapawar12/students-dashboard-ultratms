import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Pen, Phone, Trash2 } from "lucide-react";
import { StudentInterface } from "../students/StudentsPage";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function StudentVertical({ student }: { student: StudentInterface }) {
  const navigate = useNavigate();

  return (
    <Card
      className="border-0 h-full flex flex-col"
      onClick={() => navigate(`/students/${student.id}`)}
    >
      <CardHeader className="flex flex-col justify-center h-full p-4">
        <div className="flex justify-center items-center mb-2 relative">
          <img
            src={`/user-images/user-${
              (student.id + 1) % 12 === 0 ? 12 : (student.id + 1) % 12
            }.jpg`}
            height={80}
            width={80}
            className="h-20 w-20 rounded-full"
          />
        </div>
        <div className="text-center">
          <CardTitle className="pb-2">{student.name}</CardTitle>
          <p className="break-all flex pb-1 flex-row items-center gap-1 justify-center">
            <Phone className="text-[#707FDD]" size={16} /> {student.phone}
          </p>
        </div>

        <div className="w-auto flex flex-row justify-evenly items-center gap-2">
          <Button
            className="w-full bg-green-400 hover:bg-green-500 text-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Pen size={15} />
          </Button>
          <Button
            className="w-full bg-red-400 hover:bg-red-500 text-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

export default StudentVertical;
