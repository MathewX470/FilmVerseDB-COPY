import {Box} from "@mui/material";
import {useEffect, useRef} from "react";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import NavigationSwiper from "./NavigationSwiper";



const MediaVideo=({video})=>{
    const iframRef=useRef();
    useEffect(() => {
    const height=iframRef.current.offsetWidth*9/16+ "px";
    iframRef.current.setAttribute("height", height);
    }, [])
    
    return(
        <Box sx={{height:"max-content"}}>
            <iframe 
            key={video.key}
            src={tmdbConfigs.youtubePath(video.key)}
            ref={iframRef}
            width="100%"
            title={video.id}
            style={{border:0}}
            >
            </iframe>
        </Box>
    )
}

const MediaVideosSlide=({videos})=>{
    return(
        <NavigationSwiper>
            {videos.map((video,index)=>(
                <SwiperSlide key={index}>
                    <MediaVideo video={video} />
                </SwiperSlide>
            ))}
        </NavigationSwiper>
    )
}

export default MediaVideosSlide;