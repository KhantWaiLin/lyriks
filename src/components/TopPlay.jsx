import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from "swiper";

import 'swiper/css';
import 'swiper/css/free-mode';

import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import PlayPause from "./PlayPause";

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="w-full flex flex-row hover:bg-[#4c426e] rounded-lg py-2 p-4 items-center cursor-pointer">
    <h3 className="font-bold text-white text-base mr-3">{i + 1}.</h3>
    <div className="flex flex-row justify-between items-center flex-1">
      <img src={song?.images?.coverart} alt={song?.title} className="rounded-lg w-20 h-20" />
      <div className="flex flex-col flex-1 justify-center mx-3">
        <Link to={`/songs/${song?.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/songs/${song?.artists[0].adamid}`}>
          <p className="text-base font-bold text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>

      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
      song={song} />
  </div>
)

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  const topPlays = data?.slice(0, 5);


  console.log(topPlays[0]);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = ({ song, i }) => {
    dispatch(setActiveSong({ song, i, data }));
    dispatch(playPause(true));

  };


  useEffect(() => {
    divRef.current.scrollIntoView({ overflow:"scroll" });
  })

  return (
    <div ref={divRef} className="xl:ml-6 ml-0   xl:mb-0 mb-6 flex-1 xl:max-w-[400px]  max-w-full flex flex-col flex-wrap">
      <div className="w-full flex flex-col ">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="flex flex-col mt-4 gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick({ song, i })} />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song.key}
              style={{ width: "25%", height: "auto" }}
              className="rounded-full shadow-lg animate-slideright">
              <Link to={`/artists/${song?.artists[0]?.adamid}`}>
                <img src={song?.images?.background} alt="name" className="rounded-full object-cover" />
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  )
};

export default TopPlay;
