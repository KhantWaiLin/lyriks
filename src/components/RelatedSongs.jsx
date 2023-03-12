import { SongBar } from './'

const RelatedSongs = ({ data, handlePauseClick, handlePlayClick, isPlaying, activeSong , artistId }) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Related Songs</h1>
    <div className='w-full mt-6 flex flex-col'>
      {data?.map((song, i) => (
        <SongBar
          song={song}
          key={i}
          artistId={artistId}
          i={i}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={()=>handlePlayClick({song,i})} />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
