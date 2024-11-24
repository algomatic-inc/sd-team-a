import { overpassQueriesForCapitals } from "../../lib/osm/overpassQueries/overpassQueriesForCapitals";
import { overpassQueriesForPrefectures } from "../../lib/osm/overpassQueries/overpassQueriesForPrefectures";

const japanPrefectures = overpassQueriesForPrefectures.map((q) => q.region);

const japanCapitalByPrefectures = overpassQueriesForCapitals.map(
  (q) => q.region
);

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
          <div>
            <select
              value={currentArea}
              onChange={(e) => onSelect(e.target.value)}
              style={{
                fontSize: "1.5rem",
              }}
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
