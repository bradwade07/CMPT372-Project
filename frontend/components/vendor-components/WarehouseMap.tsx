"use client";

import { getAllWarehouses, getWarehouse } from "@/api/warehouse";
import { Warehouse } from "@/api/warehouse.types";
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useQuery } from "@tanstack/react-query";

const icon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconSize: [30, 50],
  iconAnchor: [16, 30],
  popupAnchor: [0, -15],
});

export default function WarehouseMap() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["Warehouses"],
    queryFn: getAllWarehouses,
  });

  return (
    <div className="w-full h-full">
      <h3 className="text-lg">
        Map of warehouse locations you can store your products at
      </h3>
      <p>Please click on a pin to see the warehouse ID</p>
      <MapContainer
        className="w-full h-full z-0"
        center={[51.100492, -98.018919]}
        zoom={3}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data &&
          data.map((warehouse: Warehouse) => (
            <Marker
              position={[warehouse.lat, warehouse.long]}
              icon={icon}
              key={warehouse.warehouse_id}
            >
              <Popup>Warehouse ID: {warehouse.warehouse_id}</Popup>
            </Marker>
          ))}
        <Marker position={[49.283353, -123.122444]} icon={icon}>
          <Popup>Stock warehouse pin</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
