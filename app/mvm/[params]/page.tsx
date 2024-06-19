import { Post } from "./client";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <Post />
    </>
  );
}
