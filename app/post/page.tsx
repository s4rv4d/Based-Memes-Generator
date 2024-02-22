import { PostInfo } from "./client";

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  // mints: number;
}

export default function Page({ item }: { item: Nft }) {
  return (
    <div>
      <PostInfo item={item} />
    </div>
  );
}
