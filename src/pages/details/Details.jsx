import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

// Importing custom hook to fetch data
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner"; // Component for details banner
import Cast from "./cast/Cast"; // Component to display cast
import VideosSection from "./videosSection/VideosSection"; // Component to display videos
import Similar from "./carousels/Similar"; // Component to display similar media
import Recommendation from "./carousels/Recommendation"; // Component to display recommended media

const Details = () => {
    // Retrieving route parameters (mediaType and id) using useParams hook from React Router
    const { mediaType, id } = useParams();

    // Fetching videos related to the media type and id
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);

    // Fetching credits (cast and crew) related to the media type and id
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );

    // Rendering components to display details, cast, videos, similar media, and recommendations
    return (
        <div>
            {/* Details banner component to display information about the media */}
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />

            {/* Cast component to display the cast of the media */}
            <Cast data={credits?.cast} loading={creditsLoading} />

            {/* Videos section component to display videos related to the media */}
            <VideosSection data={data} loading={loading} />

            {/* Similar media component to display media similar to the current one */}
            <Similar mediaType={mediaType} id={id} />

            {/* Recommendation component to display recommended media */}
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;

