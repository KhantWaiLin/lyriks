import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {

  const artist = artistData?.artists[artistId]?.attributes;



  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28">
        <div className="absolute inset-0 flex items-center">
          <img
            alt="art"
            src={artistId ? artist?.artwork?.url :
              songData?.images?.coverart
            }
            className="sm:w-48 w-28 sm:h-48 h-28 rounded-full border-2 shadow-xl shadow-black"
          />
          <div className="ml-5">
            <p className="font-bold text-white text-xl sm:text-3xl">
              {artistId ? artist?.name : songData?.title}
            </p>
            {!artistId && (
              <Link to={`/artists/${songData?.artists[0].adamid}`}>
                <p className="text-gray-400 text-base mt-2">{songData?.subtitle}</p>
              </Link>
            )}
            <p className="text-gray-400 text-base mt-2">
              {artistId? artist?.genreNames[0]: songData?.genres?.primary}
            </p>

          </div>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24 "/>
    </div>
  )
};

export default DetailsHeader;
