import React, { useState } from 'react';
import { Link } from "react-router-dom";
import millify from "millify";
import { Grid, Avatar, Typography, Button } from "@material-ui/core";
import Linkify from 'react-linkify';

const VideoDescription = ({ currentVideo }) => {
    const [more, setMore] = useState(false);

    return (
        <div className="mt-3">
            <Grid container>
                <Grid item xs={2} sm={1}>
                    <Avatar style={{ width: "45px", height: "45px" }} component={Link}
                        to={`/channel/${currentVideo?.creator?._id}`} src={currentVideo?.creator?.imageUrl} />
                </Grid>
                <Grid item xs={10} sm={11}>
                    <Typography className="white" variant="subtitle1" component={Link} to={`/channel/${currentVideo?.creator?._id}`}>
                        {currentVideo?.creator?.name}
                    </Typography>
                    <Typography variant="subtitle2" className="grey" style={{ marginTop: "-5px" }}>
                        {millify(0, { precision: 1 })} subscribers
                    </Typography>
                    <Linkify properties={{ target: '_blank', style: { color: 'blue' } }}>
                        {currentVideo?.video?.description?.length > 180 ?
                            <>
                                <pre className="white mt-3">
                                    {!more ?
                                        <>
                                            {currentVideo?.video?.description?.substring(0, 180) + " ..."}
                                        </>
                                        :
                                        <>
                                            {currentVideo?.video?.description}
                                        </>
                                    }
                                </pre>
                                <Button style={{ marginTop: "-15px" }} onClick={() => setMore(!more)}>
                                    <b className="grey">SHOW {!more ? "MORE" : "LESS"}</b>
                                </Button>
                            </>
                            :
                            <pre className="white mt-3">{currentVideo?.video?.description}</pre>
                        }
                    </Linkify>
                </Grid>
            </Grid>
            <hr />
        </div>
    );
}

export default VideoDescription;