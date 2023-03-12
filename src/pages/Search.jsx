
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery} from "../redux/services/shazamCore";


const Search = () => {
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const {searchTerm} = useParams();
    const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);    
    console.log(data);

    const songs = data?.tracks?.hits?.map((song)=>song?.track);

    if (isFetching) return <Loader title='Loading Top Charts' />

    if (error) return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="text-3xl mt-4 font-bold text-white text-left mb-10">Showing Results for:
            <span className="font-black"> {searchTerm}</span> </h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {songs?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        i={i}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data} />
                ))}

            </div>

        </div>
    )
};

export default Search;

