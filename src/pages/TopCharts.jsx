
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";


const TopCharts = () => {
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetTopChartsQuery();

    


    if (isFetching) return <Loader title='Loading Top Charts' />

    if (error) return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="text-3xl mt-4 font-bold text-white text-left mb-10">Top Charts</h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => (
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

export default TopCharts;
