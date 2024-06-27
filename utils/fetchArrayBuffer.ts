export const fetchArrayBuffer = async (url: string): Promise<ArrayBuffer> => {
  const response = await fetch(url, {});

  if (!response.ok) {
    throw new Error(`Failed to fetch resource: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
};
