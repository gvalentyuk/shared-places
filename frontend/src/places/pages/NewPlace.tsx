import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useHttp } from "../../hooks/http-hook";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import ImageUpload from "../../shared/FormElements/ImageUpload";
import ErrorModal from "../../shared/UI/ErrorModal";
import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import Button from "../../shared/FormElements/Button";
import "./Place.css";

type Place = {
  title: string;
  description: string;
  address: string;
};

const NewPlace: React.FC = () => {
  const history = useHistory();
  const [file, setFile] = useState<any>();
  const [previewUrl, setPreviewUrl] = useState<any>();
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const auth = useContext(AuthContext);
  const { error, clearError, isLoading, sendRequest } = useHttp();
  const onSubmit = async (data: Place) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("image", file);

    await sendRequest(
      "http://localhost:5000/api/places",
      "POST",
      {
        Authorization: `Bearer ${auth.user.token}`,
      },
      formData
    );
    history.push("/");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="place-form" onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`form-control ${errors.title && "form-control--invalid"}`}
        >
          <label htmlFor="title">Title</label>
          <input
            name="title"
            ref={register({ required: true, minLength: 4, maxLength: 50 })}
            id="title"
          />
        </div>
        <ImageUpload
          file={file}
          setFile={setFile}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          center
        />
        <div
          className={`form-control ${
            errors.description && "form-control--invalid"
          }`}
        >
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            ref={register({ required: true, minLength: 5, maxLength: 350 })}
          />
        </div>

        <div
          className={`form-control ${
            errors.address && "form-control--invalid"
          }`}
        >
          <label htmlFor="address">Address</label>
          <input
            name="address"
            ref={register({ required: true, minLength: 4, maxLength: 50 })}
            id="address"
          />
        </div>

        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
