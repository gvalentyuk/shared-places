import React, { useState, useContext } from "react";

import Map from "../../shared/UI/Map";
import Modal from "../../shared/UI/Modal";
import Card from "../../shared/UI/Card";
import Button from "../../shared/FormElements/Button";
import { AuthContext } from "../../context/AuthContext";
import "./PlaceItem.css";

type Props = {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  location: {
    lng: number;
    lat: number;
  };
};

const PlaceItem: React.FC<Props> = (props) => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);

  const openConfirm = () => setConfirmModal(true);
  const closeConfirm = () => setConfirmModal(false);

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.location} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={closeConfirm}
        header={"Are you sure?"}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={closeConfirm}>CANCEL</Button>
            <Button onClick={closeConfirm}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that is
          can't be undone thereafter?
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMap}>
              VIEW ON MAP
            </Button>
            {auth.isLogged && <Button to={`/places/${props.id}`}>EDIT</Button>}
            {auth.isLogged && (
              <Button danger onClick={openConfirm}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
