import axios from 'axios';
import { useEffect, useState } from 'react';
import { AbsoluteCenter, Spinner } from '@chakra-ui/react'
import CaptionCarousel from './CaptionCarousel';
import Testimonial from './Testimonial';


export default function AboutPage(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    return(
        <>
            <CaptionCarousel />
            <Testimonial />
        </>
    )
}

