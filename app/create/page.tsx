import { CreatePost } from "./client";

export default function Page({ params }: { params: { name: string } }) {
  return (
    <div>
      <CreatePost />
    </div>
  );
}
