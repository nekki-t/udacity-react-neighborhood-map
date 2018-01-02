import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui/Progress';
import { styles } from '../styles/loading';
import { yellow } from 'material-ui/colors';

const Loading = ({withOverLay}) => {
   let tag = (
    <div style={styles.circlularArea}>
      <CircularProgress size={200} style={{color: yellow[500]}} />
    </div>
  );

  if (withOverLay) {
    tag = (
      <div style={styles.onProgress}>
        {tag}
      </div>
    )
  }

  return (
    tag
  );
};

Loading.propTypes = {
  withOverLay: PropTypes.bool.isRequired,
};

export default Loading;