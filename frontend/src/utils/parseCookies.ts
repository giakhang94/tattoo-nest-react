// const tokens = ['authentication_token', 'refresh_token'];

//headers co dang
//['authentication_token=xxxx; path=/; httpOnly; Secure, refresh_token=yyyy; path=/; httpOnly; secure']

export const parseCookies = (setCookie: string[]) => {
  const tokensArray = setCookie[0].split(",");
  const result: { [key: string]: string } = {};
  tokensArray.map((token: string) => {
    if (token.includes("token")) {
      const extractToken = token.split(";")[0].split("=");
      result[extractToken[0]] = extractToken[1];
    }
  });
  console.log("result", result);
  return result;
};
