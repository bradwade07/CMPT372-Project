"use client";

import { ShoppingCartEntry } from "@/api/product.types";
import { getWarehouse } from "@/api/warehouse";
import { Warehouse } from "@/api/warehouse.types";
import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconSize: [30, 50],
  iconAnchor: [16, 30],
  popupAnchor: [0, -15],
});

type PickupMapProps = {
  data: ShoppingCartEntry[] | undefined;
};

export default function PickupMap({ data }: PickupMapProps) {
  let warehouses: Warehouse[] = [];

  useEffect(() => {
    warehouses = [];

    data?.forEach(async (item) => {
      if (item.delivery == false && item.warehouse_id) {
        if (
          !warehouses.find((warehouse: Warehouse) => {
            return warehouse.warehouse_id == item.warehouse_id;
          })
        ) {
          const warehouse = await getWarehouse(item.warehouse_id);
          if (warehouse) warehouses.push(warehouse);
        }
      }
    });
  }, [data]);

  return (
    <div className="w-full h-full">
      <h3 className="text-lg">
        Map of warehouse locations you chose to pick up items at:
      </h3>
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
        {warehouses.map((warehouse: Warehouse) => (
          <Marker position={[warehouse.lat, warehouse.long]} icon={icon}>
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
