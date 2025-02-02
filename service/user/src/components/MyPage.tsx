import { DocumentMyRes } from "@/apis/document/get/my";
import { MyFeedbackResType } from "@/apis/feedback/my";
import { Button } from "@packages/ui";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const statusList = ["작성", "제출됨", "공유됨"];
const statusIdx = {
  CREATED: 0,
  SUBMITTED: 1,
  SHARED: 2,
};

interface PropsType {
  profile: DocumentMyRes;
  feedbacks: MyFeedbackResType;
}

export const MyPage = ({ profile, feedbacks }: PropsType) => {
  const {
    profile_image_url,
    name,
    major_name,
    grade,
    class_num,
    number,
    email,
    is_exist,
    status,
    heading,
    introduce,
  } = profile;
  const { feedback_list } = feedbacks;
  return (
    <div className="max-w-[1200px] px-[40px] sm:px-[20px] w-full m-auto my-[200px] sm:mt-[164px]">
      <div className="transition-all relative bg-gray50 w-full rounded-[15px] px-40 md:px-[80px] sm:px-[48px] pt-[170px] sm:pt-[120px] pb-[80px] sm:pb-[80px] mb-[120px]">
        <div className="transition-all absolute -top-20 sm:-top-16 -ml-20 md:-ml-12 sm:-ml-8 flex gap-x-[30px]">
          <div className="flex flex-col items-center gap-y-5">
            <Image
              width={160}
              height={160}
              src={profile_image_url}
              alt="profile"
              priority
              className="rounded-full w-40 h-40 object-cover sm:w-[100px] sm:h-[100px]"
            />
            <div className="w-[2px] h-8 sm:h-8 bg-gray200 rounded" />
          </div>
          <div className="mt-[4px]">
            <p className="text-title1 sm:text-title3 text-gray50 h-[36px] mb-[6px] sm:-mb-2">{name}</p>
            <p className="text-gray300 text-body4 sm:text-body5 mb-[56px] sm:mb-[32px] h-[24px]">
              {major_name || "전공을 선택해 주세요"}
            </p>
            <p className="text-body5 sm:text-body8 mb-[23px] sm:mb-[12px]">
              {grade}학년 {class_num}반 {number}번
            </p>
            <p className="text-body5 sm:text-body8">
              {email || "이메일이 등록되지 않았습니다"}
            </p>
          </div>
        </div>

        {is_exist ? (
          <>
            <p className="text-body3 sm:text-body5 mb-[44px] sm:mb-[28px] whitespace-pre-wrap">
              {heading}
            </p>
            <p className="text-body6 sm:text-body7 text-gray400 whitespace-pre-wrap">
              {introduce === "" ? "문서를 작성해주세요" : introduce}
            </p>
          </>
        ) : (
          <p className="text-body6 text-gray400">문서를 작성해주세요</p>
        )}
      </div>

      <p className="text-title1 mb-2.5">레주메</p>
      <p className="text-title4 mb-[47px]">Resumé</p>
      <div className="w-full h-[190px] bg-gray50 rounded-2xl pt-[60px] flex justify-center">
        <div className="flex">
          {statusList.map((statusItem, idx) => {
            const progress = statusIdx[status || "CREATED"];
            return (
              <Ball
                key={statusItem}
                complete={idx <= progress}
                isFirstLine={idx === 0}
              >
                <div>{statusItem}</div>
              </Ball>
            );
          })}
          <Line width={80} />
        </div>
      </div>

      <div className="bg-gray50 rounded-2xl pl-12 pr-12 text-body3 mt-5 pt-14 pb-14 flex flex-col gap-10">
        {!!feedback_list.length ? (
          <>
            <div>
              <span>피드백</span>
              <span className="text-gray300 ml-2">{feedback_list.length}</span>
            </div>
            {feedback_list.map(({ element_name, comment }) => (
              <div
                key={element_name}
                className="bg-gray100 rounded-2xl pl-10 pr-10 pt-12 pb-12 flex flex-col gap-[30px]"
              >
                <p>{element_name}</p>
                <p className="text-body6 whitespace-pre-wrap">{comment}</p>
              </div>
            ))}
          </>
        ) : (
          <p className="w-full h-40 bg-gray100 rounded-2xl flex justify-center items-center whitespace-pre-wrap text-center text-body5">
            {"이력서를 작성하고, 제출하여\n 피드백을 받아보세요"}
          </p>
        )}
        <div className="flex justify-end gap-x-5 [&>button]:w-fit">
          <Link href="/preview">
            <Button kind="contained" radius="circle">
              미리보기
            </Button>
          </Link>
          <Link href="/resume/my">
            <Button kind="contained" radius="circle">
              내 이력서 관리하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

interface BallType {
  children: ReactNode;
  complete?: boolean;
  isFirstLine?: boolean;
}

interface LineType {
  width: number;
  complete?: boolean;
}

const Line = ({ complete, width }: LineType) => (
  <div
    className={`${complete ? "h-[3px]" : "h-[2px]"} mt-5 ${
      complete ? "bg-gray900" : "bg-gray300"
    }`}
    style={{ width: width }}
  ></div>
);

const Ball = ({ complete, children, isFirstLine }: BallType) => (
  <>
    <Line complete={complete} width={isFirstLine ? 80 : 340} />
    <div className="flex flex-col items-center gap-y-[15px]">
      <div
        className={`w-[30px] h-[30px] m-[5px] rounded-[100px] ${
          complete ? "bg-gray900" : "bg-gray300"
        }`}
      />
      {children}
    </div>
  </>
);
