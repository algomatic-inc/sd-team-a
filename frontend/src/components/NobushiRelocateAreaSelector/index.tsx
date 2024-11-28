import { overpassQueriesForRegions } from "../../lib/osm/overpassQueries/overpassQueriesForRegions";
import { overpassQueriesForPrefectures } from "../../lib/osm/overpassQueries/overpassQueriesForPrefectures";

const japanPrefectures = overpassQueriesForPrefectures.map((q) => q.region);

const japanCapitalByPrefectures = overpassQueriesForRegions.map(
  (q) => q.region
);

export const NobushiRelocateAreaSelector: React.FC<{
  currentAreas: string[];
  currentArea: string;
  onSelect: (area: string) => void;
}> = ({ currentAreas, currentArea, onSelect }) => {
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
              defaultValue={currentArea}
              onChange={(e) => onSelect(e.target.value)}
              style={{
                fontSize: "1.4rem",
              }}
              disabled={true}
            >
              {japanCapitalByPrefectures.map((capitalByPrefecture, index) => {
                return (
                  <option
                    key={`${capitalByPrefecture}-${index}`}
                    value={capitalByPrefecture}
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
