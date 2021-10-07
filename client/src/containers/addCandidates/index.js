import React, { Component } from 'react'
import axios from "axios"
import swal from "sweetalert2"
import { CSVReader } from 'react-papaparse'
import { UserContext } from "../../context/userContext";
import language from "../../properties/language";
import { endpoint } from '../../api';

const buttonRef = React.createRef()
class AddCandidates extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      filename: null,
      candidates: [],
    }
  }
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = (data, file) => {
    this.setState({ filename: file.name })
    if (file.name.includes('.csv')) {
      this.setState({ candidates: null }); //Reset the state
      this.setState({ candidates: data });
    }
    else {
      console.log('NOT CSV');
    }
  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
      this.setState({ candidates: null })
      console.log(this.state.candiates);
    }
  }

  confirmSubmit() {
    swal.fire({
      title: 'Caution!',
      text: language.addCandidatesCautionHolder[this.context.language],
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: language.continueHolder[this.context.language]
    }).then((result) => {
      if (result.isConfirmed) {
        this.handeSubmit();
        swal.fire(
          language.addedCandidatesToDatabaseAlert[this.context.language]
        )
      }
    })
  }

  handeSubmit() {
    if (this.state.filename.includes('.csv')) {
      axios.post(endpoint.addCandidates, { candidate: this.state.candidates })
        .then(res => {
          console.log('YEET');
        });
    }
    else {
      alert('Cant upload a file that is not a CSV one');
    }
  }

  render() {
    return (
      <div className="addCan"
        style={{
          marginTop: 20,
          maxWidth: 500,
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#FFFFFF",
          padding: 15,
        }}
      >
        <p> {language.manyCandidates[this.context.language]}</p>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          onSubmit={this.handleOnSubmit}
          noClick
          noDrag
          config={{ header: true }}
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10
              }}
            >
              <button
                type='button'
                onClick={this.handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: '30%',
                  paddingLeft: 0,
                  paddingRight: 0,
                }}
              >
                {language.browseButton[this.context.language]}
              </button>
              <div
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#ccc',
                  height: 45,
                  lineHeight: 2.5,
                  marginTop: 5,
                  marginBottom: 5,
                  paddingLeft: 13,
                  paddingTop: 3,
                  width: '60%'
                }}
              >
                {file && file.name}
              </div>
              <button
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 20,
                  paddingRight: 20,
                  display: 'flex',
                  justifyContent: 'center',
                }}
                onClick={this.handleRemoveFile}
              >
                {language.removeButton[this.context.language]}
              </button>
            </aside>
          )}
        </CSVReader>
        <button onClick={this.confirmSubmit.bind(this)}
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >{language.fillFormButton[this.context.language]}</button>
      </div >
    )
  }
}
export default AddCandidates;