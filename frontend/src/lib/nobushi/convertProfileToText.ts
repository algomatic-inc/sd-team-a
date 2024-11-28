import { NobushiUserProfile } from "../../types/NobushiUserProfile";

export const convertProfileToText = (profile: NobushiUserProfile) => {
  return `年齢: ${profile.age}歳
性別: ${profile.gender}
職業: ${profile.job}
家族構成: ${profile.family}`;
};
