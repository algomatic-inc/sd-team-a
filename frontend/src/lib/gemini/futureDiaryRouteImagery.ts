import { RemoteRunnable } from "@langchain/core/runnables/remote";
import { AIMessage } from "@langchain/core/messages";

export const futureDiaryRouteSatelliteImagery = async (
  profileText: string,
  routeText: string,
  inputImageBase64: string
) => {
  const remoteRunnable = new RemoteRunnable({
    url: "https://api.nobushi.yuiseki.net/future_dialy/",
  });

  try {
    const result = (await remoteRunnable.invoke({
      profile: profileText,
      route: routeText,
      image_data: inputImageBase64,
    })) as AIMessage;
    return result.content as string;
  } catch (error) {
    console.error(error);
    return null;
  }
};
