import React from "react";

import Card from "../../shared/UI/Card";
import UserItem from "./UserItem";
import "./UsersList.css";

export type User = {
  id: string;
  image: string;
  name: string;
  places: number;
};

type Props = {
  items: User[];
};

const UsersList: React.FC<Props> = (props) => {
  if (!props.items.length) {
    return (
      <Card>
        <div className="center">
          <h2>Users not found.</h2>
        </div>
      </Card>
    );
  }

  return (
    <ul className={"users-list"}>
      {props.items.map((item: User) => {
        return (
          <UserItem
            key={item.id}
            id={item.id}
            name={item.name}
            placesCount={item.places}
            image={item.image}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
