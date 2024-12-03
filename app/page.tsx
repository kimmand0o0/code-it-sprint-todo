import dynamic from "next/dynamic";

export interface ITodo {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
  tenantId?: string;
}

const DynamicComponentWithNoSSR = dynamic(() => import("./main"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <DynamicComponentWithNoSSR />;
    </div>
  );
}
