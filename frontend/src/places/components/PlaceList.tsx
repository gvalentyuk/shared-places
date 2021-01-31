import React from "react";

import PlaceItem from "./PlaceItem";
import Card from "../../shared/UI/Card";
import Button from '../../shared/FormElements/Button';
import "./PlaceList.css";

type Place = {
  _id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  coordinates: {
    lng: number;
    lat: number;
  };
};

type Props = {
  items: Place[];
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
          coordinates={place.coordinates}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
