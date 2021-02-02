import React, { useEffect, useRef } from "react";

import Button from "./Button";
import "./ImageUpload.css";

type Props = {
  center?: boolean;
  file?: File;
  setFile: (file: File) => void;
  previewUrl: any;
  setPreviewUrl: (url: any) => void;
};

const ImageUpload: React.FC<Props> = (props) => {
  const filePickerRef = useRef<any>();

  useEffect(() => {
    if (!props.file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      props.setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(props.file);
  }, [props]);

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const pickedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      let pickedFile = event.target.files[0];
      props.setFile(pickedFile);
    }
  };

  return (
    <div className="form-control">
      <input
        ref={filePickerRef}
        type="file"
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {props.previewUrl && <img src={props.previewUrl} alt="Preview" />}
          {!props.previewUrl && <p>Please, choose image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
