"use client";

import { Button, Card, CardBody } from "@nextui-org/react";
import React, { useState } from "react";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";

export function Filters() {
  const priceFilterRange = { min: 0, max: 100 };
  const ratingFilterRange = { min: 0, max: 5 };

  const [priceRange, setPriceRange] = useState(priceFilterRange);
  const [reviewRange, setReviewRange] = useState(ratingFilterRange);

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
          onChange={setReviewRange}
        />
        <Button>Save Filters</Button>
      </CardBody>
    </Card>
  );
}
