import React from "react";

import UsersList from "../components/UsersList";

const Users: React.FC = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Gleb Val',
            image: 'https://miro.medium.com/max/700/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
            places: 3
        },
        {
            id: 'u2',
            name: 'Dima Gr',
            image: 'https://miro.medium.com/max/700/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
            places: 2
        }
    ]
    return (
        <UsersList items={USERS}/>
    )
};

export default Users;
