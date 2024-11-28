import React, { useCallback, useState } from "react";

import { NobushiRegionalMap } from "../components/NobushiRegionalMap";
import { NobushiRelocateAreaSelector } from "../components/NobushiRelocateAreaSelector";
import { NobushiAnimatedText } from "../components/NobushiAnimatedText";
import { NobushiUserProfileCollector } from "../components/NobushiUserProfileCollector";
import { NobushiUserProfile } from "../types/NobushiUserProfile";

export const RelocatePage: React.FC = () => {
  const [profile, setProfile] = useState<NobushiUserProfile | null>(null);

  const [area1, setArea1] = useState<string>("東京都中野区");
  const [area2, setArea2] = useState<string>("東京都台東区");
  const [area3, setArea3] = useState<string>("兵庫県神戸市");
  const [area4, setArea4] = useState<string>("沖縄県那覇市");

  const onProfileCollected = useCallback((profile: NobushiUserProfile) => {
    setProfile(profile);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          display: profile ? "none" : "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          backgroundColor: "midnightblue",
          zIndex: 100000,
        }}
      >
        <div
          style={{
            fontSize: "2.5em",
            fontWeight: 600,
          }}
        >
          <NobushiAnimatedText
            text="地方移住支援システム　NOBUSHI"
            interval={70}
          />
        </div>
        <h2>プロフィールを入力してください</h2>
        <NobushiUserProfileCollector onProfileCollected={onProfileCollected} />
      </div>
      {profile && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            zIndex: 999,
            opacity: profile ? 1 : 0,
          }}
        >
          {
            // ユーザープロフィールを取得完了後に、
            // 2x2 のグリッドで地域ごとの地図を表示
          }
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "1fr 1fr",
              height: "100vh",
              width: "100vw",
            }}
          >
            {[area1, area2, area3, area4].map((area, idx) => {
              return (
                <div
                  key={`area-${area}-${idx}`}
                  style={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <NobushiRegionalMap
                    region={area}
                    profile={profile}
                    attributionPosition={"top-right"}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "25px",
                      right: "5px",
                      color: "white",
                    }}
                  >
                    <NobushiRelocateAreaSelector
                      currentAreas={[area1, area2, area3, area4]}
                      currentArea={area}
                      onSelect={(newArea) => {
                        console.log(newArea, idx);
                        switch (idx) {
                          case 0:
                            setArea1(newArea);
                            break;
                          case 1:
                            setArea2(newArea);
                            break;
                          case 2:
                            setArea3(newArea);
                            break;
                          case 3:
                            setArea4(newArea);
                            break;
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
