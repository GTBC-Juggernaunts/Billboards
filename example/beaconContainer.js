import { connect } from 'react-redux';

const mapStateToProps  = (state) => {
    beacon: state.beacon
};

export default connect(
  mapStateToProps
)(beaconComponent)