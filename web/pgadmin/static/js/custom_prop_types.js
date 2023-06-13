import PropTypes from 'prop-types';
import BaseUISchema from 'sources/schema_view/base_schema.ui';

/* Common Prop types */
const CustomPropTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    PropTypes.object
  ]),

  schemaUI: PropTypes.instanceOf(BaseUISchema),

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),

  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),

  shortcut: PropTypes.shape({
    alt: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    control: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    shift: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    key: PropTypes.shape({
      char: PropTypes.string,
    }),
  }),
};

export default CustomPropTypes;
