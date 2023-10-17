import fetch from "node-fetch";

async function run() {
  try {
    let sleep = function (ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const USER_NAME = process.env.USER_NAME;
    const PASSWORD = process.env.PASSWORD;
    console.log("USER_NAME : ", USER_NAME);
    console.log("PASSWORD : ", PASSWORD);

    let body_0 = {
      username: USER_NAME,
      password: PASSWORD,
    };

    let body_1 = {
      UserName: "<Enter UserName>",
      RepoType: "AZUREDEVOPS",
      ConnectionName: "<Enter Connection Name>",
      SystemType: "SNOWFLAKE",
      TargetSystemName: "DEMO_DB",
      BaseBranch: "main",
    };

    const TokenFetchResponse = await fetch(
      "http://10.174.54.169/api/v1/users/login-user",
      {
        method: "post",
        body: JSON.stringify(body_0),
        headers: { "Content-Type": "application/json" },
      }
    );
    const Tokendata = await TokenFetchResponse.json();
    const Token = Tokendata.token;

    console.log("Token : ", Token);

    await sleep(20000);

    const resp = await fetch(
      "http://10.174.54.169/api/v1/4d/ci/cd/execute-system-ddl-query",
      {
        method: "post",
        body: JSON.stringify(body_1),
        headers: {
          "Content-Type": "application/json",
          cookie: `4dalert-user-token=${Token}`,
        },
      }
    );

    // console.log("deployScriptResp : ", deployScriptResp);
    console.log({ resp });

    commentBody = await resp.data.text();
    console.log("commentBody : ", commentBody);
  } catch (err) {
    console.log("Error In Run : ", err);
  }
  console.log("success");
}

run();
