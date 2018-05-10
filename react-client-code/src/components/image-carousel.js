import React from 'react';
import {RingLoader} from 'react-spinners';
import {Carousel} from 'react-materialize';

const ImageCarousel = ({imgList, loading}) =>{
    return(
      <div>
        // {isLoading(loading)}
        {carousel(imgList)}
      </div>
    );
}

const carousel = (imgList) =>{
  if (imgList.length > 0) {
    return (<div>
      <Carousel images={imgList} />
    </div>);
  }
}

const isLoading = (loading) =>{
  if (loading) {
    return (<div className="center-div div-padding-top">
      <div className='sweet-loading'>
        <RingLoader color={'#123abc'} loading={loading}/>
      </div>
    </div>);
  }
}

export default ImageCarousel;
