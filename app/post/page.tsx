import { PostInfo } from "./client";

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  mints: number;
  fileName: string;
}

export default function Page({ params }: { params: { item: Nft } }) {
  return (
    <div>
      <PostInfo item={params.item} />
    </div>
  );
}
