export const overpassQueriesForRegions = [
  {
    region: "北海道札幌市",
    capital: true,
    query: `
  [out:json];
  area["name"="北海道"]["admin_level"="4"];
  relation["name"="札幌市"]["admin_level"="7"];
  out geom;
  `,
  },
  {
    region: "青森県青森市",
    capital: true,
    query: `
  [out:json];
  area["name"="青森県"]["admin_level"="4"];
  relation["name"="青森市"]["admin_level"="7"];
  out geom;
  `,
  },
  {
    region: "岩手県盛岡市",
    capital: true,
    query: `
  [out:json];
  area["name"="岩手県"]["admin_level"="4"];
  relation["name"="盛岡市"]["admin_level"="7"];
  out geom;
  `,
  },
  {
    region: "宮城県仙台市",
    capital: true,
    query: `
  [out:json];
  area["name"="宮城県"]["admin_level"="4"];
  relation["name"="仙台市"]["admin_level"="7"];
  out geom;
  `,
  },
  {
    region: "秋田県秋田市",
    capital: true,
    query: `
[out:json];
area["name"="秋田県"]["admin_level"="4"];
relation["name"="秋田市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "山形県山形市",
    capital: true,
    query: `
[out:json];
area["name"="山形県"]["admin_level"="4"];
relation["name"="山形市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "福島県福島市",
    capital: true,
    query: `
[out:json];
area["name"="福島県"]["admin_level"="4"];
relation["name"="福島市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "茨城県水戸市",
    capital: true,
    query: `
[out:json];
area["name"="茨城県"]["admin_level"="4"];
relation["name"="水戸市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "栃木県宇都宮市",
    capital: true,
    query: `
[out:json];
area["name"="栃木県"]["admin_level"="4"];
relation["name"="宇都宮市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "群馬県前橋市",
    capital: true,
    query: `
[out:json];
area["name"="群馬県"]["admin_level"="4"];
relation["name"="前橋市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "埼玉県さいたま市",
    capital: true,
    query: `
[out:json];
area["name"="埼玉県"]["admin_level"="4"];
relation["name"="さいたま市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "千葉県千葉市",
    capital: true,
    query: `
[out:json];
area["name"="千葉県"]["admin_level"="4"];
relation["name"="千葉市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "東京都東京都",
    capital: true,
    query: `
[out:json];
area["name"="東京都"]["admin_level"="4"];
relation["name"="東京都"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "神奈川県横浜市",
    capital: true,
    query: `
[out:json];
area["name"="神奈川県"]["admin_level"="4"];
relation["name"="横浜市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "新潟県新潟市",
    capital: true,
    query: `
[out:json];
area["name"="新潟県"]["admin_level"="4"];
relation["name"="新潟市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "富山県富山市",
    capital: true,
    query: `
[out:json];
area["name"="富山県"]["admin_level"="4"];
relation["name"="富山市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "石川県金沢市",
    capital: true,
    query: `
[out:json];
area["name"="石川県"]["admin_level"="4"];
relation["name"="金沢市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "福井県福井市",
    capital: true,
    query: `
[out:json];
area["name"="福井県"]["admin_level"="4"];
relation["name"="福井市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "山梨県甲府市",
    capital: true,
    query: `
[out:json];
area["name"="山梨県"]["admin_level"="4"];
relation["name"="甲府市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "長野県長野市",
    capital: true,
    query: `
[out:json];
area["name"="長野県"]["admin_level"="4"];
relation["name"="長野市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "岐阜県岐阜市",
    capital: true,
    query: `
[out:json];
area["name"="岐阜県"]["admin_level"="4"];
relation["name"="岐阜市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "静岡県静岡市",
    capital: true,
    query: `
[out:json];
area["name"="静岡県"]["admin_level"="4"];
relation["name"="静岡市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "愛知県名古屋市",
    capital: true,
    query: `
[out:json];
area["name"="愛知県"]["admin_level"="4"];
relation["name"="名古屋市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "三重県津市",
    capital: true,
    query: `
[out:json];
area["name"="三重県"]["admin_level"="4"];
relation["name"="津市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "滋賀県大津市",
    capital: true,
    query: `
[out:json];
area["name"="滋賀県"]["admin_level"="4"];
relation["name"="大津市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "京都府京都市",
    capital: true,
    query: `
[out:json];
area["name"="京都府"]["admin_level"="4"];
relation["name"="京都市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "大阪府大阪市",
    capital: true,
    query: `
[out:json];
area["name"="大阪府"]["admin_level"="4"];
relation["name"="大阪市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "兵庫県神戸市",
    capital: true,
    query: `
[out:json];
area["name"="兵庫県"]["admin_level"="4"];
relation["name"="神戸市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "奈良県奈良市",
    capital: true,
    query: `
[out:json];
area["name"="奈良県"]["admin_level"="4"];
relation["name"="奈良市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "和歌山県和歌山市",
    capital: true,
    query: `
[out:json];
area["name"="和歌山県"]["admin_level"="4"];
relation["name"="和歌山市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "鳥取県鳥取市",
    capital: true,
    query: `
[out:json];
area["name"="鳥取県"]["admin_level"="4"];
relation["name"="鳥取市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "島根県松江市",
    capital: true,
    query: `
[out:json];
area["name"="島根県"]["admin_level"="4"];
relation["name"="松江市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "岡山県岡山市",
    capital: true,
    query: `
[out:json];
area["name"="岡山県"]["admin_level"="4"];
relation["name"="岡山市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "広島県広島市",
    capital: true,
    query: `
[out:json];
area["name"="広島県"]["admin_level"="4"];
relation["name"="広島市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "山口県山口市",
    capital: true,
    query: `
[out:json];
area["name"="山口県"]["admin_level"="4"];
relation["name"="山口市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "徳島県徳島市",
    capital: true,
    query: `
[out:json];
area["name"="徳島県"]["admin_level"="4"];
relation["name"="徳島市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "香川県高松市",
    capital: true,
    query: `
[out:json];
area["name"="香川県"]["admin_level"="4"];
relation["name"="高松市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "愛媛県松山市",
    capital: true,
    query: `
[out:json];
area["name"="愛媛県"]["admin_level"="4"];
relation["name"="松山市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "高知県高知市",
    capital: true,
    query: `
[out:json];
area["name"="高知県"]["admin_level"="4"];
relation["name"="高知市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "福岡県福岡市",
    capital: true,
    query: `
[out:json];
area["name"="福岡県"]["admin_level"="4"];
relation["name"="福岡市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "佐賀県佐賀市",
    capital: true,
    query: `
[out:json];
area["name"="佐賀県"]["admin_level"="4"];
relation["name"="佐賀市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "長崎県長崎市",
    capital: true,
    query: `
[out:json];
area["name"="長崎県"]["admin_level"="4"];
relation["name"="長崎市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "熊本県熊本市",
    capital: true,
    query: `
[out:json];
area["name"="熊本県"]["admin_level"="4"];
relation["name"="熊本市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "大分県大分市",
    capital: true,
    query: `
[out:json];
area["name"="大分県"]["admin_level"="4"];
relation["name"="大分市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "宮崎県宮崎市",
    capital: true,
    query: `
[out:json];
area["name"="宮崎県"]["admin_level"="4"];
relation["name"="宮崎市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "鹿児島県鹿児島市",
    capital: true,
    query: `
[out:json];
area["name"="鹿児島県"]["admin_level"="4"];
relation["name"="鹿児島市"]["admin_level"="7"];
out geom;
`,
  },
  {
    region: "沖縄県那覇市",
    capital: true,
    query: `
[out:json];
area["name"="沖縄県"]["admin_level"="4"];
relation["name"="那覇市"]["admin_level"="7"];
out geom;
`,
  },
];
