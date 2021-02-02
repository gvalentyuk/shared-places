import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { useHttp } from "../../hooks/http-hook";

import { AuthContext } from "../../context/AuthContext";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import ErrorModal from "../../shared/UI/ErrorModal";
import Card from "../../shared/UI/Card";
import Button from "../../shared/FormElements/Button";
import "./Place.css";

type PlaceType = {
  title: string;
  description: string;
};

const UpdatePlace: React.FC = () => {
  const auth = useContext(AuthContext);
  const { placeId } = useParams<{ placeId: string }>();
  const history = useHistory();
  const [place, setPlace] = useState<PlaceType>({
    title: "",
    description: "",
  });
  const { error, isLoading, clearError, sendRequest } = useHttp();
  useEffect(() => {
    const fetchPlace = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
      );
      setPlace(responseData.place);
    };

    fetchPlace();
  }, [placeId, sendRequest]);

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data: PlaceType) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user.token}`,
        },
        JSON.stringify({
          title: data.title,
          description: data.description,
        })
      );
      history.push("/");
    } catch (e) {}
  };

  if (!place) {
    return (
      <div className="center">
        <Card>
          <h2>Place not found</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <form className="place-form" onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`form-control ${errors.title && "form-control--invalid"}`}
        >
          <label htmlFor="title">Title</label>
          <input
            name="title"
            ref={register({ required: true, minLength: 4, maxLength: 50 })}
            id="title"
            defaultValue={place.title}
          />
        </div>

        <div
          className={`form-control ${
            errors.description && "form-control--invalid"
          }`}
        >
          <label htmlFor="description">Description</label>
          <textarea
            defaultValue={place.description}
            name="description"
            ref={register({ required: true, minLength: 5 })}
          />
        </div>

        <Button type="submit">UPDATE PLACE</Button>
      </form>
    </React.Fragment>
  );
};

export default UpdatePlace;
