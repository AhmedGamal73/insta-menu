import * as React from "react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetRestaurants } from "@/hooks/use-restaurant";
import AddNewRestaurant from "../../restaurant/AddNewRestaurant";

export function SelectRestaurant({ onRestaurantSelect }) {
  const [selectedRestaurantId, setSelectedRestaurant] = useState("");

  const { data: restaurants } = useGetRestaurants();

  const handleRestaurantChange = (e) => {
    setSelectedRestaurant(e);
    onRestaurantSelect(e);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex gap-2">
        <Select onValueChange={(value) => handleRestaurantChange(value)}>
          <SelectTrigger className="w-11/12">
            <SelectValue placeholder="إختر المطعم" />
          </SelectTrigger>
          <SelectContent>
            {restaurants &&
              restaurants.map((rest, index) => (
                <SelectItem key={index} value={rest._id}>
                  {rest.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <AddNewRestaurant />
      </div>
    </div>
  );
}
