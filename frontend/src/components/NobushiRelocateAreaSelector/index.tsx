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

const japanCapitalByPrefecturesObjects = [
  {
    prefecture: "北海道",
    capital: "札幌市",
  },
  {
    prefecture: "青森県",
    capital: "青森市",
  },
  {
    prefecture: "岩手県",
    capital: "盛岡市",
  },
  {
    prefecture: "宮城県",
    capital: "仙台市",
  },
  {
    prefecture: "秋田県",
    capital: "秋田市",
  },
  {
    prefecture: "山形県",
    capital: "山形市",
  },
  {
    prefecture: "福島県",
    capital: "福島市",
  },
  {
    prefecture: "茨城県",
    capital: "水戸市",
  },
  {
    prefecture: "栃木県",
    capital: "宇都宮市",
  },
  {
    prefecture: "群馬県",
    capital: "前橋市",
  },
  {
    prefecture: "埼玉県",
    capital: "さいたま市",
  },
  {
    prefecture: "千葉県",
    capital: "千葉市",
  },
  {
    prefecture: "東京都",
    capital: "東京都",
  },
  {
    prefecture: "神奈川県",
    capital: "横浜市",
  },
  {
    prefecture: "新潟県",
    capital: "新潟市",
  },
  {
    prefecture: "富山県",
    capital: "富山市",
  },
  {
    prefecture: "石川県",
    capital: "金沢市",
  },
  {
    prefecture: "福井県",
    capital: "福井市",
  },
  {
    prefecture: "山梨県",
    capital: "甲府市",
  },
  {
    prefecture: "長野県",
    capital: "長野市",
  },
  {
    prefecture: "岐阜県",
    capital: "岐阜市",
  },
  {
    prefecture: "静岡県",
    capital: "静岡市",
  },
  {
    prefecture: "愛知県",
    capital: "名古屋市",
  },
  {
    prefecture: "三重県",
    capital: "津市",
  },
  {
    prefecture: "滋賀県",
    capital: "大津市",
  },
  {
    prefecture: "京都府",
    capital: "京都市",
  },
  {
    prefecture: "大阪府",
    capital: "大阪市",
  },
  {
    prefecture: "兵庫県",
    capital: "神戸市",
  },
  {
    prefecture: "奈良県",
    capital: "奈良市",
  },
  {
    prefecture: "和歌山県",
    capital: "和歌山市",
  },
  {
    prefecture: "鳥取県",
    capital: "鳥取市",
  },
  {
    prefecture: "島根県",
    capital: "松江市",
  },
  {
    prefecture: "岡山県",
    capital: "岡山市",
  },
  {
    prefecture: "広島県",
    capital: "広島市",
  },
  {
    prefecture: "山口県",
    capital: "山口市",
  },
  {
    prefecture: "徳島県",
    capital: "徳島市",
  },
  {
    prefecture: "香川県",
    capital: "高松市",
  },
  {
    prefecture: "愛媛県",
    capital: "松山市",
  },
  {
    prefecture: "高知県",
    capital: "高知市",
  },
  {
    prefecture: "福岡県",
    capital: "福岡市",
  },
  {
    prefecture: "佐賀県",
    capital: "佐賀市",
  },
  {
    prefecture: "長崎県",
    capital: "長崎市",
  },
  {
    prefecture: "熊本県",
    capital: "熊本市",
  },
  {
    prefecture: "大分県",
    capital: "大分市",
  },
  {
    prefecture: "宮崎県",
    capital: "宮崎市",
  },
  {
    prefecture: "鹿児島県",
    capital: "鹿児島市",
  },
  {
    prefecture: "沖縄県",
    capital: "那覇市",
  },
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
            gap: "10px",
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
