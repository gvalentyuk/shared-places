import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http-hook";

import { Place } from "../place-type";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import PlaceList from "../components/PlaceList";

const UserPlaces: React.FC = () => {
  const { isLoading, sendRequest, } = useHttp();
  const [places, setPlaces] = useState<Place[]>([]);
  const { userId } = useParams<{ userId: string }>();
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setPlaces(responseData.places);
      } catch (e) {}
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  const filterList = (id: string) => {
    setPlaces(places.filter((item) => item._id !== id));
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <PlaceList filterList={filterList} items={places} />
    </React.Fragment>
  );
};

export default UserPlaces;
