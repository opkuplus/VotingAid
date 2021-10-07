import React, { useState, useEffect } from 'react'
import axios from "axios";

const Upload = ({ email, onUpload, profile }) => {
    const [fileInputState, setFileInputState] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    // const [name, setName] = useState('')

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const fileName = e.target.files[0];
        previewFile(file)
        setSelectedFile(file.name)
        // setName(file.name)
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        // shows the picture you are uploading, not necessary
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            // setPreviewSource(reader.result)
            uploadImage(reader.result, file.name);
            // console.log(file)
            // console.log(previewSource)
            // console.log(selectedFile)
        }
    }
    // const handleSubmitFile = () => {
    //     // e.preventDefault();
    //     if (!previewSource) return;
    //     uploadImage(previewSource, selectedFile);
    // }
    let dataResp;
    const uploadImage = async (base64EncodedImage, fileName) => {
        console.log(email)
        try {
            await axios.post('/api/uploadImage', { data: base64EncodedImage, email, fileName }
                // body: JSON.stringify({ data: base64EncodedImage, email, fileName }),
                // headers: { 'Content-type': 'application/json' },
            ).then(resp => {
                dataResp = resp.data;
                console.log(resp)
            })
            onUpload(dataResp)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form>
                <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="form-input" />
                {/* <button className="form-input" type="submit">Submit</button> */}
            </form>
            {/* {previewSource && (
                <img src={previewSource} alt="chosen" style={{ height: '300px' }} />
            )} */}
        </div>
    )
}

export default Upload
