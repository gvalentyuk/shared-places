import React, { useEffect, useState } from "react";
import { useHttp } from "../../hooks/http-hook";

import LoadingSpinner from "../../shared/UI/LoadingSpinner";
import ErrorModal from "../../shared/UI/ErrorModal";
import UsersList from "../components/UsersList";

const Users: React.FC = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const { isLoading, error, clearError, sendRequest } = useHttp();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );
        setLoadedUsers(response.users);
      } catch (e) {}
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
