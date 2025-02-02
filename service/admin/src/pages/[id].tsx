import { studentDetail } from "@/apis/document/get/studentDetail";
import { getStudent } from "@/apis/student";
import { FeedbackBox } from "@/components/FeedbackBox";
import { Sharing } from "@/components/Sharing";
import { PreviewResume, SideBar } from "@packages/ui";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { PdfPreviewer } from "@/components/PdfPreviewer";

const Detail = () => {
  const { query } = useRouter();
  const { id } = query;
  const [shared, setShared] = useState<boolean>(false);
  const [pdfView, setPdfView] = useState<boolean>(false);

  const { data } = useQuery(
    ["teacherPreview", id],
    () => studentDetail(query.id as string),
    {
      enabled: !!query.id,
      onSuccess: ({ data }) => setShared(data.document_status === "SHARED"),
    }
  );
  const grade = data?.data.writer.student_number.toString()[0];

  const studentListObject = (classNum: string) => ({
    queryKey: ["class" + classNum],
    queryFn: () => getStudent({ grade: grade as string, classNum }),
    enabled: !!grade,
    staleTime: Infinity,
  });
  const result = useQueries({
    queries: [
      studentListObject("1"),
      studentListObject("2"),
      studentListObject("3"),
      studentListObject("4"),
    ],
  }).map((list) => list.data?.data.student_list);

  const isCreated = data?.data.document_status === "CREATED";
  const Shared =
    isCreated || !data
      ? undefined
      : () => {
          const { writer, document_id } = data.data;
          const { student_number, name } = writer;
          return (
            <Sharing
              name={student_number + name}
              document_id={document_id}
              shared={shared}
              pdfView={setPdfView}
              changeSharing={() => setShared(!shared)}
            />
          );
        };
  const FeedBackBoxUnShared = isCreated || shared ? undefined : FeedbackBox;

  return (
    <div>
      <SideBar
        studentList={result}
        id={id as string}
        grade={grade}
        Sharing={Shared}
      >
        {data && (
          <>
            <PreviewResume {...data.data} FeedbackBox={FeedBackBoxUnShared} />
            {pdfView && <PdfPreviewer {...data.data} pdfView={setPdfView} />}
          </>
        )}
      </SideBar>
    </div>
  );
};

export default Detail;
