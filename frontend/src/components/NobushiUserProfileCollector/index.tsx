// ユーザーのプロフィールを収集するコンポーネント
// LocalStorageにプロフィールが保存されていたら、それを読み込む
// LocalStorageにプロフィールが保存されていなかったら、プロフィールを入力するフォームを表示する
// デフォルト値は「未回答」

import React, { useState, useEffect } from "react";

import { NobushiUserProfile } from "../../types/NobushiUserProfile";

export const NobushiUserProfileCollector: React.FC<{
  onProfileCollected: (profile: NobushiUserProfile) => void;
}> = ({ onProfileCollected }) => {
  const savedAge = localStorage.getItem("nobushiUserProfileAge");
  const [age, setAge] = useState<number | "未回答">(
    savedAge ? parseInt(savedAge) : "未回答"
  );
  const savedGender = localStorage.getItem("nobushiUserProfileGender");
  const [gender, setGender] = useState<NobushiUserProfile["gender"]>(
    savedGender ? (savedGender as NobushiUserProfile["gender"]) : "未回答"
  );
  const savedJob = localStorage.getItem("nobushiUserProfileJob");
  const [job, setJob] = useState<string | "未回答">(
    savedJob ? savedJob : "未回答"
  );
  const savedFamily = localStorage.getItem("nobushiUserProfileFamily");
  const [family, setFamily] = useState<string | "未回答">(
    savedFamily ? savedFamily : "未回答"
  );

  useEffect(() => {
    localStorage.setItem("nobushiUserProfileAge", age.toString());
  }, [age]);

  useEffect(() => {
    localStorage.setItem("nobushiUserProfileGender", gender);
  }, [gender]);

  useEffect(() => {
    localStorage.setItem("nobushiUserProfileJob", job);
  }, [job]);

  useEffect(() => {
    localStorage.setItem("nobushiUserProfileFamily", family);
  }, [family]);

  const handleProfileCollected = () => {
    onProfileCollected({
      age,
      gender,
      job,
      family,
    });
  };

  return (
    <div>
      <div>
        <label>年齢</label>
        {
          // 18歳から100歳までの範囲で選択できる
        }
        <select
          value={age}
          onChange={(e) =>
            setAge(
              e.target.value === "未回答" ? "未回答" : parseInt(e.target.value)
            )
          }
        >
          <option value="未回答">未回答</option>
          {Array.from({ length: 100 - 18 + 1 }, (_, i) => i + 18).map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>性別</label>
        <select
          value={gender}
          onChange={(e) =>
            setGender(e.target.value as NobushiUserProfile["gender"])
          }
        >
          <option value="未回答">未回答</option>
          <option value="男">男</option>
          <option value="女">女</option>
          <option value="その他">その他</option>
        </select>
      </div>
      <div>
        <label>職業</label>
        <input
          type="text"
          placeholder="職業"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
      </div>
      <div>
        <label>家族構成</label>
        <input
          type="text"
          placeholder="家族構成"
          value={family}
          onChange={(e) => setFamily(e.target.value)}
        />
      </div>
      <button onClick={handleProfileCollected}>プロフィールを保存</button>
    </div>
  );
};
