import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Error, Loader, RelatedSongs, DetailsHeader } from "../components";

import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetRelatedSongsQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid } = useParams();
    const { isPlaying, activeSong } = useSelector((state) => state.player);

    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
    const { data, isFetching: isFetchingRelatedSongs, error } = useGetRelatedSongsQuery({ songid });

    const handlePauseClick = () => {
        dispatch(playPause(false));
      };
    
      const handlePlayClick = ({song,i}) => {
        dispatch(setActiveSong({ song, i, data }));
        dispatch(playPause(true));
    
      };

    console.log(data);

    if (isFetchingRelatedSongs || isFetchingSongDetails) return <Loader title="Loading Song Details" />

    if (error) return <Error />

    return (
        <div className="flex flex-col">
            <DetailsHeader songData={songData} artistId="" />
            <div className="mb-10">
                <h2 className="font-bold text-3xl text-white">Lyrics:</h2>
                <div className="mt-5">
                    {songData?.sections[1].type === 'LYRICS' ? (
                        songData?.sections[1].text.map((line, i) => (
                            <p key={i} className="text-gray-400 text-base my-1">{line}</p>
                        ))
                    ) : (<p className="text-gray-400 text-base my-1">Sorry, Lyrics Not Found</p>)}
                </div>
            </div>
            <RelatedSongs
                data ={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
                artistId=""
                 />
        </div>
    )
};

export default SongDetails;
