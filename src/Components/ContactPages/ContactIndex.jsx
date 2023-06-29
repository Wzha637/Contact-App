import React, { Component } from "react";
import Header from "../Layout/Header";
import AddRandomContacts from "./AddRandomContacts";
import RemoveAllContact from "./RemoveAllContact";
import AddContact from "./AddContact";
import FavouriteContacts from "./FavouriteContacts";
import GeneralContacts from "./GeneralContacts";
import Footer from "../Layout/Footer";

export class ContactIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [
        {
          id: 1,
          name: "William Zhu",
          email: "Williamliu1108@hotmail.com",
          phone: "0210432272",
          isFavourite: false,
        },
        {
          id: 2,
          name: "Harry Zhu",
          email: "HarryZhu@hotmail.com",
          phone: "0210001001",
          isFavourite: true,
        },
        {
          id: 3,
          name: "Grace Zhu",
          email: "GraceZhu@hotmail.com",
          phone: "0210398153",
          isFavourite: true,
        },
      ],
      selectedContact: undefined,
      isUpdating: false,
    };
  }

  handleAddContact = (newContact) => {
    // check for empty name and phone
    if (newContact.name == "") {
      return { status: "faliure", msg: "Please enter a valid Name" };
    } else if (newContact.phone == "") {
      return { status: "faliure", msg: "Please enter a valid Phone number" };
    }
    //check for duplicate values
    const duplicateRecord = this.state.contactList.filter((contact) => {
      if (
        contact.name == newContact.name &&
        contact.phone == newContact.phone
      ) {
        return true;
      }
    });

    if (duplicateRecord.length > 0) {
      return { status: "faliure", msg: "Duplicate Record!!" };
    } else {
      const finalContact = {
        ...newContact,
        id: this.state.contactList[this.state.contactList.length - 1].id + 1,
        isFavourite: false,
      };
      this.setState((prevState) => {
        return {
          contactList: prevState.contactList.concat([finalContact]),
        };
      });
      return { status: "success", msg: "Contact was added successfully" };
    }
  };

  handleToggleFavourites = (contact) => {
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.map((obj) => {
          if (obj.id == contact.id) {
            return { ...obj, isFavourite: !obj.isFavourite };
          } else {
            return obj;
          }
        }),
      };
    });
  };

  handleDeleteContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.filter((obj) => {
          return obj.id !== contactId;
        }),
      };
    });
  };

  handleAddRandomContact = (newContact) => {
    const finalContact = {
      ...newContact,
      id: this.state.contactList[this.state.contactList.length - 1].id + 1,
      isFavourite: false,
    };
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.concat([finalContact]),
      };
    });
  };

  handleRemoveAllContact = () => {
    this.setState((prevState) => {
      return {
        contactList: [],
      };
    });
  };

  handleUpdateClick = (contact) => {
    this.setState((prevState) => {
      return {
        selectedContact: contact,
        isUpdating: true,
      };
    });
  };

  handleCancelUpdateClick = () => {
    this.setState((prevState) => {
      return {
        selectedContact: undefined,
        isUpdating: false,
      };
    });
  };

  handleUpdateContact = (updatedContact) => {
    // check for empty name and phone
    if (updatedContact.name == "") {
      return { status: "faliure", msg: "Please enter a valid Name" };
    } else if (updatedContact.phone == "") {
      return { status: "faliure", msg: "Please enter a valid Phone number" };
    }
    this.setState((prevState) => {
      return {
        contactList: prevState.contactList.map((contact) => {
          if (contact.id == updatedContact.id) {
            return {
              ...contact,
              name: updatedContact.name,
              email: updatedContact.email,
              phone: updatedContact.phone,
            };
          }
          return contact;
        }),
        isUpdating: false,
        selectedContact: undefined,
      };
    });
    return { status: "success", msg: "Contact was updated successfully" };
  };

  render() {
    return (
      <div>
        <Header></Header>
        <div className="container" style={{ minHeight: "85vh" }}>
          <div className="row py-3">
            <div className="col-4 offset-2 row">
              <AddRandomContacts
                handleAddRandomContact={this.handleAddRandomContact}
              ></AddRandomContacts>
            </div>
            <div className="col-4 row">
              <RemoveAllContact
                handleRemoveAllContact={this.handleRemoveAllContact}
              ></RemoveAllContact>
            </div>
            <div className="row py-2">
              <div className="col-8 row offset-2">
                <AddContact
                  handleAddContact={this.handleAddContact}
                  isUpdating={this.state.isUpdating}
                  selectedContact={this.state.selectedContact}
                  cancelUpdateContact={this.handleCancelUpdateClick}
                  handleUpdateContact={this.handleUpdateContact}
                ></AddContact>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 row offset-2">
                <FavouriteContacts
                  contacts={this.state.contactList.filter(
                    (obj) => obj.isFavourite == true
                  )}
                  favouriteClick={this.handleToggleFavourites}
                  deleteContact={this.handleDeleteContact}
                  handleUpdateClick={this.handleUpdateClick}
                ></FavouriteContacts>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-8 row offset-2">
                <GeneralContacts
                  contacts={this.state.contactList.filter(
                    (obj) => obj.isFavourite == false
                  )}
                  favouriteClick={this.handleToggleFavourites}
                  deleteContact={this.handleDeleteContact}
                  handleUpdateClick={this.handleUpdateClick}
                ></GeneralContacts>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default ContactIndex;
