import Cookie from "universal-cookie";

export const azureLogin = () => {
  return fetch(`${import.meta.env.VITE_API_BASE_URL}/azure/login`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((e) => console.log(e.message));
};

export const getAzureToken = async () => {
  const cookie = new Cookie();
  const speechToken = cookie.get("speech-token");

  if (speechToken === undefined) {
    try {
      const res = await azureLogin();
      const token = res.data.token;
      const region = res.data.region;
      cookie.set("speech-token", region + ":" + token, {
        maxAge: 540,
        path: "/",
      });

      return { authToken: token, region: region };
    } catch (err) {
      console.log(err.response.data);
      return { authToken: null, error: err.response.data };
    }
  } else {
    const idx = speechToken.indexOf(":");
    return {
      authToken: speechToken.slice(idx + 1),
      region: speechToken.slice(0, idx),
    };
  }
};
