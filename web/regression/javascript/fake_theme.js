import React from 'react';
import Theme from 'sources/theme';

export function withTheme(WrappedComp) {
  // eslint-disable-next-line react/display-name
  return (props)=>{
    return <Theme><WrappedComp {...props}/></Theme>;
  };
}
