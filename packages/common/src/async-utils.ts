export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchData = async (url: string) => {
  await delay(100);
  return { data: `Data from ${url}` };
};
