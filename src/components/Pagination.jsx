import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "./../redux/actions/video";

const useStyles = makeStyles(() => ({
    ul: {
        justifyContent: "space-around"
    }
}));

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector(state => state.videos);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) dispatch(getVideos(page));
    }, [page]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={item => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/?page=${item.page}`}
                />
            )}
        />
    );
}

export default Paginate;