// 地方移住の未来日記を書く際に必要となる、
// 利用ユーザーのプロフィールの型定義
// 年齢、性別、職業、家族構成など

export type NobushiUserProfile = {
  age: number | "未回答";
  gender: "男" | "女" | "その他" | "未回答";
  job: string | "未回答";
  family: string | "未回答";
};
