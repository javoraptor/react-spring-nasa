import React from 'react';
import {Carousel, Grid, Col, Row, Thumbnail} from 'react-bootstrap';

const BootImageCarousel = ({images}) =>{
    return(
      <div>
        <div className="layout">
          <div className="center">
            {carousel(images)}
          </div>
        </div>
        {renderImageGrid(images)}
      </div>
    );
}

const renderGridColumns = ( images ) => {
  return images.map((entry, index) => {
    let entryString = entry.toString();
    return (<Col xs={6} md={3} key={index}>
      <Thumbnail href={entryString} target="_blank" alt="171x180" src={entryString}/>
    </Col>);
  });
}

const renderImageGrid = (images) =>{
  if (images.length > 0) {
    return (<Grid>
      <Row>
        {renderGridColumns(images)}
      </Row>
    </Grid>);
  }
}

const renderImages = (images) =>{
  if (images.length > 0) {
    return images.map((entry, index) => {
      return (<Carousel.Item key={index}>
        {/* <Image src={entry} responsive="responsive"/> */}
        <img width={900} height={500} alt="900x500" src={entry}/>
      </Carousel.Item>);
    });
  }
}

const carousel = (images) =>{
  if (images.length > 0) {
    return (<Carousel>
      {renderImages(images)}
    </Carousel>);
  }
}


export default BootImageCarousel;
