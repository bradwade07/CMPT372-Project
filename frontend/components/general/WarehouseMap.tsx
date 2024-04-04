// NOTE: import this component like so (otherwise there will be an error)
// import dynamic from "next/dynamic";
// const WarehouseMap = dynamic(() => import("@/components/general/WarehouseMap"), {
// 	loading: () => null,
// 	ssr: false,
// });

import L from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type WarehouseMapProps = {
  data: { lat: number; long: number; warehouse_id: number }[] | undefined;
};

export default function WarehouseMap({ data }: WarehouseMapProps) {
  const icon = L.icon({
    iconUrl: "/leaflet/marker-icon.png",
    iconSize: [30, 50],
    iconAnchor: [16, 30],
    popupAnchor: [0, -15],
  });

  return (
    <MapContainer
      className="w-full h-full z-0"
      center={[51.100492, -98.018919]}
      zoom={3}
      minZoom={3}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data &&
        data.map(
          (warehouse: { lat: number; long: number; warehouse_id: number }) => (
            <Marker
              position={[warehouse.lat, warehouse.long]}
              icon={icon}
              key={warehouse.warehouse_id}
            >
              <Popup>Warehouse ID: {warehouse.warehouse_id}</Popup>
            </Marker>
          ),
        )}
    </MapContainer>
  );
}
