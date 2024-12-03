"use client";

import { FC, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import CheckListDetail from "@/app/components/check-list-detail";
import Button from "@/app/components/button";

import {
  deleteTodo,
  getTodoById,
  updateComplete,
  updateImage,
  updateImgUrl,
  updateMemo,
} from "@/app/api/actions";
import useWindowWidth from "@/app/utils/getWindowWidth";

import { ITodo } from "@/app/page";

import Check from "@/app/assets/icons/check.svg";
import XIcon from "@/app/assets/icons/X.svg";
import ImageUpdate from "@/app/assets/icons/edit.svg";
import PlusEdit from "@/app/assets/icons/plus-edit.svg";

const Detail: FC = () => {
  const router = useRouter();
  const path = usePathname();

  const [preview, setPreview] = useState("");

  const [todo, setTodo] = useState<ITodo>();
  const [memo, setMemo] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const width = useWindowWidth() || 1200;

  const fetchTodo = async () => {
    try {
      const data = await getTodoById(Number(path.slice(1)));
      setTodo(data);
      setMemo(data.memo);
      setPreview(data.imageUrl);
    } catch (error) {}
  };

  const handleUpdateComplete = async () => {
    try {
      await updateComplete({
        ...todo,
        isCompleted: !todo?.isCompleted,
      } as ITodo);

      setTodo({
        ...(todo as ITodo),
        isCompleted: !todo?.isCompleted,
      });
    } catch (error) {
      alert("업데이트에 실패하였습니다. 잠시 후 다시 시도해주세요!");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateMemo({
        ...todo,
        memo,
      } as ITodo);

      setTodo({
        ...todo,
        memo,
      } as ITodo);

      router.push("/");
    } catch (error) {
      alert("업데이트에 실패하였습니다. 잠시 후 다시 시도해주세요!");
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(todo?.id as number);

      router.push("/");
    } catch (error) {
      alert("할일 삭제에 실패하였습니다. 잠시 후 다시 시도해주세요!");
    }
  };

  const handleImage = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 5;
    if (file.size > MAX_IMAGE_SIZE_BYTES)
      return alert("최대 5MB까지 업로드 가능합니다.");

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setPreview(reader.result as string);
    };

    const formData = new FormData();
    formData.append("image", file);

    const imageUrl = await updateImage(formData);

    await updateImgUrl({ ...todo, imageUrl } as ITodo);
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  useEffect(() => {
    if (memo === (todo?.memo || "")) return setIsActive(false);

    setIsActive(true);
  }, [memo, todo]);

  return (
    <div>
      <CheckListDetail
        todo={todo}
        handleUpdateComplete={handleUpdateComplete}
      />
      <div className={`flex ${width < 1199 ? "flex-col" : "flex-row"}`}>
        <div className={`w-full ${width > 1199 && "mr-6 max-w-[384px]"}`}>
          <div className="relative w-full h-[311px] my-4 border-2 border-slate-300 rounded-3xl border-dashed bg-slate-50 flex justify-center items-center overflow-hidden object-fill">
            <Image src={ImageUpdate} alt="image_default" hidden={!!preview} />
            <Image
              src={preview}
              alt="image_preview"
              width={1980}
              height={305}
              hidden={!preview}
              className="object-fill"
            />
            <label
              htmlFor="input_file"
              className="absolute bottom-4 right-4 size-16 bg-slate-200 rounded-full flex justify-center items-center cursor-pointer"
            >
              <Image src={PlusEdit} alt="plus-edit" />
            </label>
          </div>
          <input
            type="file"
            name="image"
            id="input_file"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
        </div>
        <div className="flex flex-col my-4 items-center bg-[url('./assets/images/memo.svg')] w-full h-[311px] rounded-3xl">
          <span className="text-[16px] font-bold text-amber-800 p-4">Memo</span>
          <textarea
            value={memo || ""}
            onChange={(event) => setMemo(event.target.value)}
            className="size-full p-4 bg-transparent resize-none outline-none flex justify-center items-center text-center text-[16px] text-slate-800"
          ></textarea>
        </div>
      </div>
      <div className={`flex my-5 button-justify`}>
        <Button
          onClick={() => handleUpdate()}
          style={`${isActive ? "bg-lime-300" : "bg-slate-200"} ${width > 599 && "mr-3"}`}
          icon={Check}
        >
          수정완료
        </Button>
        <Button
          onClick={() => handleDeleteTodo()}
          style={`bg-rose-500 text-white ${width > 599 && "ml-3"}`}
          icon={XIcon}
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
};

export default Detail;
