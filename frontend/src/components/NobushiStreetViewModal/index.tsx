import React, { useCallback, useEffect, useState } from "react";
import { getStaticStreetviewUrl } from "../../lib/streetview/getStaticStreetviewUrl";

interface NobushiStreetViewModalProps {
  lat: number;
  lon: number;
  onClose: () => void;
}

export const NobushiStreetViewModal: React.FC<NobushiStreetViewModalProps> = ({
  lat,
  lon,
  onClose,
}) => {
  const [streetViewUrl, setStreetViewUrl] = useState("");
  const handleOverlayClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // イベントの伝播を停止
  }, []);

  useEffect(() => {
    const fetchStreetView = async () => {
      try {
        const streetview_url = await getStaticStreetviewUrl(lat, lon);
        const response = await fetch(streetview_url, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        setStreetViewUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error fetching street view image:", error);
        // エラーハンドリングを追加する
      }
    };

    if (lat && lon) {
      fetchStreetView();
    }
  }, [lat, lon]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10001,
      }}
      onClick={handleOverlayClick}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          position: "relative",
        }}
        onClick={handleContentClick}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          ×
        </button>
        {streetViewUrl ? (
          <img src={streetViewUrl} alt="Street View" />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};
