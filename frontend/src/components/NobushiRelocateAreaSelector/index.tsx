const japanPrefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

const japanCapitalByPrefectures = [
  "北海道札幌市",
  "青森県青森市",
  "岩手県盛岡市",
  "宮城県仙台市",
  "秋田県秋田市",
  "山形県山形市",
  "福島県福島市",
  "茨城県水戸市",
  "栃木県宇都宮市",
  "群馬県前橋市",
  "埼玉県さいたま市",
  "千葉県千葉市",
  "東京都東京都",
  "神奈川県横浜市",
  "新潟県新潟市",
  "富山県富山市",
  "石川県金沢市",
  "福井県福井市",
  "山梨県甲府市",
  "長野県長野市",
  "岐阜県岐阜市",
  "静岡県静岡市",
  "愛知県名古屋市",
  "三重県津市",
  "滋賀県大津市",
  "京都府京都市",
  "大阪府大阪市",
  "兵庫県神戸市",
  "奈良県奈良市",
  "和歌山県和歌山市",
  "鳥取県鳥取市",
  "島根県松江市",
  "岡山県岡山市",
  "広島県広島市",
  "山口県山口市",
  "徳島県徳島市",
  "香川県高松市",
  "愛媛県松山市",
  "高知県高知市",
  "福岡県福岡市",
  "佐賀県佐賀市",
  "長崎県長崎市",
  "熊本県熊本市",
  "大分県大分市",
  "宮崎県宮崎市",
  "鹿児島県鹿児島市",
  "沖縄県那覇市",
];

export const NobushiRelocateAreaSelector: React.FC<{
  currentAreas: string[];
  currentArea: string;
  onSelect: (area: string) => void;
}> = ({ currentAreas, currentArea, onSelect }) => {
  console.log(currentAreas, currentArea);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div>現在の地域</div>
          <div>
            <select
              value={currentArea}
              onChange={(e) => onSelect(e.target.value)}
            >
              {japanCapitalByPrefectures.map((capitalByPrefecture, index) => {
                console.log(capitalByPrefecture, currentArea);
                return (
                  <option
                    key={`${capitalByPrefecture}-${index}`}
                    value={capitalByPrefecture}
                    selected={
                      currentArea.includes(capitalByPrefecture) ? true : false
                    }
                    disabled={
                      currentAreas.filter((area) =>
                        japanPrefectures.includes(area)
                      ).length > 0
                        ? true
                        : false
                    }
                  >
                    {capitalByPrefecture}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
