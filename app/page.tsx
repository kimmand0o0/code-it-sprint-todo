import Main from "@/app/main";

export interface ITodo {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
  tenantId?: string;
}

export default function Home() {
  return <Main />;
}
