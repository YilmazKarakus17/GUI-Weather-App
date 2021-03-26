import React from 'react';
import SwipeableViews from 'react-swipeable-views';

// styling for slides
const styles = {
  slide: {
    padding: 0,
    minHeight: '100%'
  },

};

// This function allows us to swipe between the different slides.
// It takes in an Array of components and then uses a map function to render
// each of the different components.
function Swiper({compArr}) {
  return (
    <SwipeableViews enableMouseEvents>
      {compArr.map((comp, index) => {
        return <div key={index} style={Object.assign({}, styles.slide)}>{comp}</div>
      })}
    </SwipeableViews>
  );
}

export default Swiper;
