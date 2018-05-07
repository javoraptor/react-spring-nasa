import React from 'react';
import {RingLoader} from 'react-spinners';
// import {Carousel} from 'react-materialize';
import {Carousel} from 'react-responsive-carousel';

const ImageCarousel = ({imgList, loading}) =>{
    console.log('logging carousel', imgList);

    return(
      <div>
        {isLoading(loading)}
        {carousel(imgList)}
      </div>
    );
}
const carousel = (imgList) =>{
  if (imgList.length > 0) {
    return (<div>
      <Carousel>
        {renderImages(imgList)}
      </Carousel>
    </div>);
  }
}

const renderImages = (imgList) =>{
  return imgList.map((e)=>{
    return(
      <div>
        <img src={e} />
      </div>
    );
  } );
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
