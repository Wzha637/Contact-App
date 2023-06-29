import { getRandomUser } from "../../Utility/api";
import React from "react";

const getRandomContact = async (props) => {
  const responseFromApi = await getRandomUser();
  // console.log(responseFromApi);
  return props.handleAddRandomContact({
    name:
      responseFromApi.data.first_name + " " + responseFromApi.data.last_name,
    email: responseFromApi.data.email,
    phone: responseFromApi.data.phone_number,
  });
};

const AddRandomContacts = (props) => {
  return (
    <div>
      <button
        className="btn btn-success form-control"
        onClick={() => getRandomContact(props)}
      >
        Add Random Contact
      </button>
    </div>
  );
};

export default AddRandomContacts;
