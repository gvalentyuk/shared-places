import React from "react";
import { useForm } from "react-hook-form";

import Button from "../../shared/FormElements/Button";
import "./Place.css";

const NewPlace: React.FC = () => {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <form className="place-form" onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`form-control ${errors.title && "form-control--invalid"}`}
      >
        <label htmlFor="title">Title</label>
        <input
          name="title"
          ref={register({ required: true, minLength: 4, maxLength: 20 })}
          id="title"
        />
      </div>

      <div
        className={`form-control ${
          errors.description && "form-control--invalid"
        }`}
      >
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          ref={register({ required: true, minLength: 5, maxLength: 250 })}
        />
      </div>

      <div
        className={`form-control ${errors.address && "form-control--invalid"}`}
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
  );
};

export default NewPlace;
