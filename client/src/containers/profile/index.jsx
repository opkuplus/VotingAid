import React, { Component } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import axios from "axios";
import Picture from "../../components/partials/picture";
import Upload from "../../components/upload";
import Swal from "sweetalert2";
import language from "../../properties/language";
import DefaultButton from "../../components/defaultButton";
import { DARK_GREEN, GREEN, WHITE } from "../../helpers/constants";
import { endpoint } from "../../api";
import DefaultInput from "../../components/defaultInput";

class Profile extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      filename: null,
    };
  }

  fetchData = async () => {
    let email = this.context.email;
    if (this.props.location.data != null) {
      email = this.props.location.data;
    }
    await axios
      .post(endpoint.profile, { email: email })
      .then((res) => {
        this.setState({ profile: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updatePicture = () => {
    // console.log(data);
    // this.setState((state) => ({
    //   ...state,
    //   profile: {
    //     ...state.profile,
    //     image: data,
    //   },
    // }));
    this.fetchData();
  };

  componentDidMount = () => {
    this.fetchData();
  };

  submitData = async () => {
    console.log("state");
    console.log(this.state.profile);
    await axios
      .post(endpoint.editInformation, { data: this.state.profile })
      .then((res) => {
        Swal.fire({
          title: language.changeProfileDataAlert[this.context.language],
          icon: "success",
        });
        this.setState({ profile: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //componentDidUpdate = () => {
  onChange = (e) => {
    let target = e.target;
    this.setState((prevState) => {
      let profile = { ...prevState.profile };
      profile[target.id] = target.value;
      console.log(profile);
      return { profile };
    });
  };
  // };

  render() {
    const { profile } = this.state;
    //console.log(profile);
    if (!profile) {
      return null;
    }
    let information = [
      {
        value: profile.name,
        key: this.state.profile.name,
        id: "name",
        placeholder: language.firstName[this.context.language],
      },
      {
        value: profile.surname,
        id: "surname",
        placeholder: language.surName[this.context.language],
      },
      {
        value: profile.school,
        id: "school",
        placeholder: language.school[this.context.language],
      },
      {
        value: profile.studentAssociation,
        id: "studentAssociation",
        placeholder:
          language.selectStudentAssociationList[this.context.language],
      },
      {
        value: profile.description,
        id: "description",
        placeholder: language.description[this.context.language],
      },
      {
        value: profile.campus,
        id: "campus",
        placeholder: language.campus[this.context.language],
      },
    ];
    return (
      <div
        className="homeScreen"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <form onSubmit={this.submitData}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            {profile.image && (
              <div
                style={{
                  width: 100,
                  height: 120,
                  objectFit: "contain",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <Picture source={profile.image} style={{ width: "100%" }} />
              </div>
            )}
          </div>
          {information &&
            React.Children.toArray(
              information.map((info) => (
                <div>
                  <DefaultInput
                    label={info.placeholder}
                    type="text"
                    name="password"
                    value={info.value}
                    onChange={this.onChange}
                    className="profileInput"
                    id={info.id}
                    required
                  />
                </div>
              ))
            )}
          {/* <FileUpload
            email={profile.email}
            onUpload={this.updatePicture}
          ></FileUpload> */}
          <Upload
            email={profile.email}
            onUpload={this.updatePicture}
            profile={this.state.profile}
          ></Upload>
          <DefaultButton
            type="submit"
            borderColor={DARK_GREEN}
            backgroundColor={GREEN}
            textColor={WHITE}
            text={language.updateButton[this.context.language]}
          />
          <hr />
          <Link
            to={{
              pathname: "/Form/" + profile.studentAssociation,
              email: profile.email,
            }}
          >
            {language.formLink[this.context.language]}
          </Link>
          <br />
        </form>
      </div>
    );
  }
}

export default Profile;
