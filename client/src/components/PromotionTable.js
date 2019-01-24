import React from 'react';
import Griddle from 'griddle-react';

const PromotionTable = props => {
    return (
      <div className="row">
        <Griddle data={props.data} />
      </div>
    )
};

export default PromotionTable