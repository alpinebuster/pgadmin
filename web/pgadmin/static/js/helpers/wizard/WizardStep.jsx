import React from 'react';
import PropTypes from 'prop-types';
export default function WizardStep({ ...props }) {
  return (
    <> {
      React.Children.map(props.children, (child) => {
        return (
          <>
            {child}
          </>
        );
      })
    }
    </>
  );
}

WizardStep.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
