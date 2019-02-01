import React from 'react';
import './kpi.css';

const KPI = props => {
  return(
    <div className="col s6 m4">
      <div className={"card " + props.cardBackgroundColor}>
        <div className={"card-content valign-wrapper " + props.cardTextColor}>
          <div className="card-text">
            <span className="card-title">{props.title}</span>
            <p>{props.subtitle}</p>
          </div>
          <span className={"KPI " + props.kpiColor}>{props.kpi}</span>
        </div>
      </div>
    </div>
  )

};

export default KPI
