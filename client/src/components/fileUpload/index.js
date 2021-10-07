import React, { useState, useContext } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import language from "../../properties/language";
import { UserContext } from '../../context/userContext';

const FileUpload = ({ email, onUpload }) => {
    const context = useContext(UserContext);
    const { language } = context;

    const [file, setFile] = useState(''); //useState is the default file: ''; only call setFile instead of setState 
    const [filename, setFilename] = useState('New profile picture');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = async e => {
        setFile(e.target.files[0]); //html input you can do multiple files, so it is like an array
        setFilename(e.target.files[0].name);

        const formData = new FormData();
        formData.append('email', email)
        formData.append('file', e.target.files[0]);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            if (typeof onUpload === 'function') {
                onUpload({ fileName, filePath })
            }
            Swal.fire({
                title: 'You have succesfully changed your profile picture!',
                icon: "success",
                confirmButtonText: "Confirm",
            })
        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('email', email)
    //     formData.append('file', file);

    //     try {
    //         const res = await axios.post('/upload', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             },
    //         });

    //         const { fileName, filePath } = res.data;
    //         setUploadedFile({ fileName, filePath });
    //         if (typeof onUpload === 'function') {
    //             onUpload({ fileName, filePath })
    //         }
    //     } catch (err) {
    //         if (err.response.status === 500) {
    //             console.log('There was a problem with the server');
    //         } else {
    //             console.log(err.response.data.msg);
    //         }
    //     }
    // }

    // const alert = () => {
    //     Swal.fire({
    //         title: 'You have succesfully changed your profile picture!',
    //         icon: "success",
    //         confirmButtonText: "Confirm",
    //     })
    // }

    return (
        <div>
            <div className="custom-file mb-4">
                <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
                <label className="custom-file-label" htmlFor="custom-file">
                    {filename}
                </label>
            </div>
            {/* <input onClick={alert} type="submit" value="Upload" /> */}
        </div>
    )
}
export default FileUpload