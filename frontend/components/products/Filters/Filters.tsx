"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import React, { useState } from "react";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";
import { FiltersType } from "@/api/filters.types";

type FiltersProps = {
  onFiltersSave: (values: FiltersType) => void;
};

export function Filters({ onFiltersSave }: FiltersProps) {
  const priceFilterRange = { min: 0, max: 300 };
  const ratingFilterRange = { min: 0, max: 5 };

  const [priceRange, setPriceRange] = useState(priceFilterRange);
  const [ratingRange, setRatingRange] = useState(ratingFilterRange);

  return (
    <Card className="w-80 h-fit">
      <CardBody className="flex flex-col align-middle text-center">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <PriceFilter
          min={priceFilterRange.min}
          max={priceFilterRange.max}
          onChange={setPriceRange}
        />
        <RatingFilter
          min={ratingFilterRange.min}
          max={ratingFilterRange.max}
          onChange={setRatingRange}
        />
        <Button
          onPress={() => {
            const filterVals: FiltersType = {
              current_price_min:
                priceRange.min != priceFilterRange.min
                  ? priceRange.min
                  : undefined,
              current_price_max:
                priceRange.max != priceFilterRange.max
                  ? priceRange.max
                  : undefined,
              product_avg_rating_min:
                ratingRange.min != ratingFilterRange.min
                  ? ratingRange.min
                  : undefined,
              product_avg_rating_max:
                ratingRange.max != ratingFilterRange.max
                  ? ratingRange.max
                  : undefined,
            };
            onFiltersSave(filterVals);
          }}
        >
          Save Filters
        </Button>
      </CardBody>
    </Card>
  );
}
