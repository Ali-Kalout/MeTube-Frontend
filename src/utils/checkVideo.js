const checkVideo = vid => {
    if (vid.title.length === 0 || vid.description.length === 0 ||
        vid.thumbnail.length === 0 || vid.selectedFile.length === 0 || vid.tags.length === 0) {
        return "Plz fill all fields !";
    }

    if (vid.selectedFile.length > 8000000) {
        return "File is too large !";
    } else if (vid.title.length > 50) {
        return "Title must be less than 50 characters !";
    } else if (vid.description.length > 500) {
        return "Description must be less than 500 characters !";
    } else if (vid.thumbnail.substring(5, 10) !== "image") {
        return "Plz upload a valid image for the thumbnail !";
    } else if (vid.selectedFile.substring(5, 10) !== "video") {
        return "Plz upload a valid video !";
    } else if (vid.tags.length > 10) {
        return "Maximum 10 tags allowed !";
    }

    return true;
}

export default checkVideo;