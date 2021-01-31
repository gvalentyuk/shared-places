import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../hooks/http-hook";

import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import ErrorModal from "../../shared/UI/ErrorModal";
import PlaceList from "../components/PlaceList";

const UserPlaces: React.FC = () => {
  const { isLoading, clearError, sendRequest, error } = useHttp();
  const [places, setPlaces] = useState([]);
  const { userId } = useParams<{ userId: string }>();
  useEffect(() => {
    const fetchPlaces = async () => {
      const responseData = await sendRequest(
        `http://localhost:5000/api/places/user/${userId}`
      );
      setPlaces(responseData.places);
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <PlaceList items={places} />
    </React.Fragment>
  );
};

export default UserPlaces;
