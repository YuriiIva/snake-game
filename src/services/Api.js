const BASE_URL = "https://61c4aa46f1af4a0017d9972f.mockapi.io";

const fetchData = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}/${path}`, options);
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

const getData = (endpoint) => fetchData(endpoint);

const saveItem = (endpoint, item, options = {}) => {
  const finalOptions = {
    method: "POST",
    // body: item,
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    ...options,
  };
  return fetchData(endpoint, finalOptions);
};

const deleteItem = (endpoint, id, options = {}) =>
  fetchData(`${endpoint}/${id}`, { method: "DELETE", ...options });

export { getData, saveItem, deleteItem };
