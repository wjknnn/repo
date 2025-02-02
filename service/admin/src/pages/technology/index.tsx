import { Header } from "@/components/header";
import { Button, Input } from "@packages/ui";
import { FormEvent, useState } from "react";
import { Plus, Search } from "@packages/ui/assets";
import { Tag } from "@/components/technology/Tag";
import { getMajor, postMajor, deleteMajor } from "@/apis/major";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Technology = () => {
  const [searchTechnology, setSearchTechnology] = useState("");
  const [technology, setTechnology] = useState("");
  const [newMajor, setNewMajor] = useState<boolean>(true);

  const { data } = useQuery(["dq"], getMajor, {
    onSuccess: () => setNewMajor(false),
    onError: () => setNewMajor(false),
    enabled: newMajor,
  });

  const { mutate: create } = useMutation({
    mutationFn: (body: string) => postMajor({ major_name: body }),
    onSuccess: (res) => {
      toast("성공적으로 생성하였습니다.", {
        autoClose: 1000,
        type: "success",
      });
      setNewMajor(true);
    },
    onError: (err) => {
      toast("무언가 잘못되었습니다!", {
        autoClose: 1000,
        type: "error",
      });
    },
  });

  const { mutate: del } = useMutation({
    mutationFn: (body: string) => deleteMajor(body),
    onSuccess: (res) => {
      toast("성공적으로 삭제하였습니다.", {
        autoClose: 1000,
        type: "success",
      });
      setNewMajor(true);
    },
    onError: (err) => {
      toast("무언가 잘못되었습니다!", {
        autoClose: 1000,
        type: "error",
      });
    },
  });

  const deleteTag = (uuid: string) => {
    del(uuid);
  };

  const addMajor = (e: FormEvent) => {
    e.preventDefault();
    create(technology);
    setTechnology("");
  };

  const filterdList = data?.data.major_list.filter((major) =>
    major.name.includes(searchTechnology)
  );

  return (
    <div>
      <Header />
      <div className="m-auto max-w-[1200px] px-[40px] sm:px-[20px] mt-40 pb-20">
        <p className="text-title1 mt-28 mb-[10px]">전공관리</p>
        <p className="text-title4 sm:text-[20px] mb-20">전공을 추가, 삭제 해보세요</p>

        <div className="flex mb-14 justify-between md:flex-wrap sm:flex-wrap gap-4">
          <Input
            value={searchTechnology}
            kind="custom"
            className="bg-gray50 w-[436px]"
            activeIcon={<Search size={24} />}
            placeholder="검색할 전공을 입력해주세요"
            onChange={(e) => setSearchTechnology(e.target.value)}
          />
          <form className="flex sm:flex-wrap gap-5" onSubmit={addMajor}>
            <Input
              value={technology}
              kind="custom"
              className="bg-gray50 w-[436px] sm:w-full"
              placeholder="추가할 전공을 입력해주세요"
              onChange={(e) => setTechnology(e.target.value)}
            />
            <Button kind="contained">
              <Plus size={18} />
              전공 추가
            </Button>
          </form>
        </div>

        <div className="flex gap-2 flex-wrap">
          <span className="text-body5">{searchTechnology || "전체"}</span>
          <span className="text-gray300">{filterdList?.length}</span>
        </div>
        <div className="flex gap-3 mt-5 flex-wrap">
          {filterdList?.map((major) => (
            <Tag key={major.id} onClick={deleteTag} data={major} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Technology;
