export const overpassQueries = [
  {
    region: "静岡県",
    query: `
    [out:json];
    relation["name"="静岡県"]["admin_level"="4"];
    out geom;
  `,
  },
  {
    region: "島根県",
    query: `
    [out:json];
    relation["name"="島根県"]["admin_level"="4"];
    out geom;
  `,
  },
  {
    region: "宮城県",
    query: `
    [out:json];
    relation["name"="宮城県"]["admin_level"="4"];
    out geom;
  `,
  },
  {
    region: "長野県",
    query: `
    [out:json];
    relation["name"="長野県"]["admin_level"="4"];
    out geom;
  `,
  },
];
