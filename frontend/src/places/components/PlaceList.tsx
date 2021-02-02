import React from "react";

import { Place } from "../place-type";
import PlaceItem from "./PlaceItem";
import Card from "../../shared/UI/Card";
import Button from "../../shared/FormElements/Button";
import "./PlaceList.css";

type Props = {
  items: Place[];
  filterList: (id: string) => void;
};

const PlaceList: React.FC<Props> = (props) => {
  if (!props.items.length) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create?</h2>
          <Button to="/places/new">Share place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place._id}
          id={place._id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          location={place.location}
          filterList={props.filterList}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
