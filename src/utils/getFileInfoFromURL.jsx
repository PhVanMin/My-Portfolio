async function getFileMetadataFromYoutube(url) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    k: "joMQW9m2xJLwZZ71vqaH88D6Al7j4vZyhNgqlAxyU",
    vid: "vwY2mUcuKzE",
  });

  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: myHeaders,
    body: raw,
  };

  fetch("https://www.y2mate.com/mates/convertV2/index", requestOptions)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

async function getFileFromURL(url) {
  try {
    const metadata = await getFileMetadataFromYoutube(url);
    return;
    console.log(metadata);
    const response = await fetch(metadata.dlink);
    const blob = await response.blob();
    console.log(blob.size);
    const file = new File([blob], metadata.title, {
      type: blob.type,
      lastModified: new Date(),
    });

    console.log(file); // Outputs: File object
    return file;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export { getFileFromURL, getFileMetadataFromYoutube };
