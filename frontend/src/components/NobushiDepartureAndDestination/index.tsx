export const NobushiDepartureAndDestination: React.FC<{
  departure?: string;
  departureLatLng?: [number, number];
  destination?: string;
  destinationLatLng?: [number, number];
}> = ({ departure, departureLatLng, destination, destinationLatLng }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        color: "white",
        background: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(2px)",
        paddingLeft: "10px",
        paddingRight: "20px",
        paddingTop: "4px",
        paddingBottom: "4px",
        zIndex: 9999,
      }}
    >
      <div>
        出発地:{" "}
        {departure?.length === 0 ? (
          "不明"
        ) : (
          <>
            {departure}
            {departureLatLng &&
              `(${departureLatLng[0]}, ${departureLatLng[1]})`}
          </>
        )}
      </div>
      <div>
        目的地:{" "}
        {destination?.length === 0 ? (
          "不明"
        ) : (
          <>
            {destination}
            {destinationLatLng &&
              `(${destinationLatLng[0]}, ${destinationLatLng[1]})`}
          </>
        )}
      </div>
    </div>
  );
};
