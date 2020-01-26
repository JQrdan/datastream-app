import React from 'react';
import { Button } from "shards-react";

class InstanceSidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'InstanceSidebar'}>
        <Button pill className={'createInstance'}>Create new Instance</Button>
      </div>
    );
  }
}

export default InstanceSidebar;