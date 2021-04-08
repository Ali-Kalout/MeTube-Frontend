import React, { useState } from 'react';
import { Grid, Paper, Button } from "@material-ui/core";
import Input from "./../components/Input";
import VideoView from "./../components/VideoView";
import FileBase from "react-file-base64";
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uploadVideo } from "./../redux/actions/video";
import base64 from "base64-url";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import checkVideo from "./../utils/checkVideo";

const NewVid = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [video, setVideo] = useState({ _id: "nan", title: "", thumbnail: "", selectedFile: "", description: "", tags: [] });
    const [isUploading, setIsUploading] = useState(false);

    const cancel = () => {
        setVideo({ _id: "nan", title: "", thumbnail: "", selectedFile: "", description: "", tags: [] });
        history.push("/");
    }

    const handleUpload = () => {
        const res = checkVideo(video)
        if (res === true) {
            setVideo({ ...video, selectedFile: base64.encode(video.selectedFile) });
            setIsUploading(true);

            toast.info("You're video will start uploading. Please wait !", {
                position: "top-right", autoClose: 5000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
            });

            dispatch(uploadVideo(video, history));

            setIsUploading(false);
        } else {
            toast.error(res, {
                position: "top-right", autoClose: 5000, hideProgressBar: false,
                closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined,
            });
        }
    }

    const handleChange = e => {
        if (e.target.name === "tags") setVideo({ ...video, tags: e.target.value.split(',') });
        else setVideo({ ...video, [e.target.name]: e.target.value });
    }

    return (
        <Grid container spacing={3} className="mt-4">
            <Grid item lg={7} md={6}>
                <Paper elevation={3} className="p-2 grey">
                    <Input name="title" handleChange={handleChange} label="Title" value={video.title} />
                    <textarea className="mt-1" name="description" onChange={handleChange} placeholder="Description"
                        rows="5" style={{ width: "100%" }} value={video.description} />
                    <Input name="tags" handleChange={handleChange} value={video.tags} label="Tags (comma separated)" />
                    <div className="box">
                        <label><b>Thumbnail</b> &nbsp;</label>
                        <FileBase type="file" multiple={false}
                            onDone={({ base64 }) => setVideo({ ...video, thumbnail: base64 })} />
                    </div>
                    <div className="box mt-1">
                        <label><b>Video File</b> &nbsp;</label>
                        <FileBase type="file" multiple={false}
                            onDone={({ base64 }) => setVideo({ ...video, selectedFile: base64 })} />
                    </div>
                </Paper>
                <Button disabled={isUploading} color="primary" className="mt-2" variant="contained" onClick={handleUpload}>
                    <PublishIcon />&nbsp; Upload
                </Button>
                <Button disabled={isUploading} color="secondary" className="mt-2 ml-2" variant="contained" onClick={cancel}>
                    <CancelIcon />&nbsp; Cancel
                </Button>
            </Grid>
            <Grid item lg={5} md={6}>
                <VideoView video={video} edit={true} />
            </Grid>
        </Grid>
    );
}

export default NewVid;