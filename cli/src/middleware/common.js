const getCommonData = async (param1, param2) => {
  const collectionName = param1;
  const docName = param2;

  const response = await fetch("/api/getCommonData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ collectionName, docName }),
  });

  return await response.json();
};

const middleware = {
  getCommonData,
};

export default middleware;
