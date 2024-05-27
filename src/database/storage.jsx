import { storage } from "./firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Add, Get } from "./database";

async function GetURL(url) {
  const strRef = ref(storage, url);
  return getDownloadURL(strRef);
}

async function AddFile(url, file) {
  const strRef = ref(storage, url);
  return uploadBytes(strRef, file)
    .then(async (snapshot) => {
      const bucket = snapshot.metadata.bucket;
      const path = snapshot.metadata.fullPath;
      const musicList = await Get("musics");
      const id = musicList.length;
      Add("musics", id, "gs://" + bucket + "/" + path);
      return true;
    })
    .catch((error) => {
      return false;
    });
}

export { GetURL, AddFile };
