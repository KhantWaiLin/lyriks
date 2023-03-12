import { useParams } from "react-router-dom";
import { useSelector} from "react-redux";


import { Error, Loader, RelatedSongs, DetailsHeader } from "../components";

import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
   
    const { id : artistId } = useParams();
    const { isPlaying, activeSong } = useSelector((state) => state.player);

    const {data: artistData , isFetching: isFetchingArtistDetails , error} = useGetArtistDetailsQuery(artistId);


    if (isFetchingArtistDetails) return <Loader title="Loading Artist Details" />

    if (error) return <Error />

    return (
        <div className="flex flex-col">
            <DetailsHeader artistData={artistData} artistId={artistId} />
           
            <RelatedSongs
                data ={Object.values(artistData?.songs)}
                isPlaying={isPlaying}
                activeSong={activeSong}
                artistId={artistId}
                 />
        </div>
    )
};

export default ArtistDetails;
