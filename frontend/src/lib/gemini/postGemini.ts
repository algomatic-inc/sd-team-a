import { RemoteRunnable } from "@langchain/core/runnables/remote";

export const postGemini = async () => {
  const remoteChain = new RemoteRunnable({
    url: "https://api.nobushi.yuiseki.net/gemini/",
  });

  const result = await remoteChain.invoke(
    "Who is the current Secretary-General of the United Nations?"
  );

  console.log(result);

  return result;
};
