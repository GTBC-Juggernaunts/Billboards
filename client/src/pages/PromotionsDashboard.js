import React from "react";
import KPI from "../components/KPI/KPI"

class PromotionsDashboard extends React.Component {
  state={
    KPI:""
  };

  firstKPI = {
    cardBackgroundColor: "white",
    cardTextColor: "blue-grey-text darken-4",
    title: "Total Promotions",
    subtitle: "subtitle",
    kpi: 42
  };

  render() {
    return(
      <div className="mainContainer">
        <div className="sidebar-area left"/>
        <div className="row">
          <div className="kpiContainer">
            <KPI 
              cardBackgroundColor={this.firstKPI.cardBackgroundColor}
              cardTextcolor={this.firstKPI.cardTextColor}
              title={this.firstKPI.title}
              subtitle={this.firstKPI.subtitle}
              kpi={this.firstKPI.kpi}
            />
            <KPI
              cardBackgroundColor={this.firstKPI.cardBackgroundColor}
              cardTextcolor={this.firstKPI.cardTextColor}
              title={this.firstKPI.title}
              subtitle={this.firstKPI.subtitle}
              kpi={this.firstKPI.kpi}
            />
            <KPI
              cardBackgroundColor={this.firstKPI.cardBackgroundColor}
              cardTextcolor={this.firstKPI.cardTextColor}
              title={this.firstKPI.title}
              subtitle={this.firstKPI.subtitle}
              kpi={this.firstKPI.kpi}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default PromotionsDashboard