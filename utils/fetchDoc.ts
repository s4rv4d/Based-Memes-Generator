import { db } from "../app/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface Nft {
  id: string;
  creatorAddress: string;
  editionAddress: string;
  ipfs: string;
  mints: number;
  fileName: string;
}

const fetchDoc = async (id: string): Promise<Nft> => {
  const docRef = doc(
    db,
    String(process.env.NEXT_PUBLIC_FIRESTIRE_ENDPOINT),
    id
  );
  const docSnap = await getDoc(docRef);
  return docSnap.data() as Nft;
};

export default fetchDoc;
