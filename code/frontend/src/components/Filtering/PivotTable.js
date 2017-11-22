/**
 * Created by steph on 2017-11-18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import createPlotlyComponent from 'react-plotly.js/factory';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';
import '../Filtering/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import items from '../Filtering/Data.js';
import { isLoading, hasStoppedLoading } from '../../actions/main-actions';
import { viewAllContractorData } from '../../actions/contractor-info-actions';

const mapStateToProps = state => {
  return {
    user: state.user,
    tables: state.tables,
    contractors: state.contractors
  };
};

const Plot = createPlotlyComponent(window.Plotly);

const mapDispatchToProps = dispatch => {
  return {
    getData: () => {
      dispatch(isLoading());
      dispatch(viewAllContractorData());
    },
    stopLoading: () => {
      dispatch(hasStoppedLoading());
    }
  };
};

const data = items;

class PivotTableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pivotState: props };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({pivotState: nextProps});
    if(nextProps.contractors.data.length > 0) {
      this.props.stopLoading();
    }
  }

  componentDidMount() {
    this.props.getData();
  }

  componentWillMount() {
    this.setState({
      mode: 'demo',
      filename: 'Contractor Data',
      pivotState: {
        data: items,
        rendererName: 'Table',
        plotlyOptions: {width: 900, height: 500}
      }
    });
  }


  render() {
    const { props, state }  = this;
    return <PivotTableUI
      data={props.contractors.data} onChange={s => this.setState({pivotState: s})}
      renderers={Object.assign({}, TableRenderers, createPlotlyRenderers(Plot))}
      {...this.state.pivotState} unusedOrientationCutoff={Infinity}
    />;
  }
}

PivotTableContainer.propTypes = {
  user: PropTypes.object.isRequired,
  tables: PropTypes.object.isRequired,
  getData: PropTypes.func.isRequired
};

const PivotTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(PivotTableContainer);

export default PivotTable;