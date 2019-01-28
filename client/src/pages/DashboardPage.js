import React from "react";
import KPI from "../components/KPI/KPI"
import './page.css'
import API from "../utils/API";

class DashboardPage extends React.Component {
  state={
    data:[]
  };

  reloadData = () => {
    API.getPromotions()
      .then(res => {
        let data = [];
        res.data.forEach(promo => {
          data.push({
            PromotionText: promo.PromotionText,
            BeaconTag: promo.BeaconTag,
            PreferenceGroup: promo.PreferenceGroup,
            ExpirationDate: promo.ExpirationDate
          })
        });
        console.log("data", data);
        this.setState({
          data
        })
      })
  };

  componentDidMount() {
    this.reloadData();
  }


  render() {
    return(
      <div className="mainContainer">
        <div className="wide-container">
          <div className="row">
            <div className="kpiContainer">
              <KPI
                cardBackgroundColor={"white"}
                cardTextcolor={"blue-grey-text text-darken-4"}
                title={"Total Promotions"}
                subtitle={"Active Records Only"}
                kpi={this.state.data.length}
                kpiColor={"deep-orange-text text-darken-2"}
              />
              <KPI
                cardBackgroundColor={"white"}
                cardTextcolor={"blue-grey-text text-darken-4"}
                title={"Total Users"}
                subtitle={"hardcoded - bs"}
                kpi={3}
                kpiColor={"cyan-text"}
              />
              <KPI
                cardBackgroundColor={"white"}
                cardTextColor={"blue-grey-text text-darken-4"}
                title={"Promotions Redeemed"}
                subtitle={"hardcoded - bs"}
                kpi={16}
                kpiColor={"indigo-text"}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardPage