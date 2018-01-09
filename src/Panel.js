import React, { PureComponent } from 'react';

export default class Panel extends PureComponent {
  render() {
    const { product } = this.props;
    return (
      <div className="ascii__panel">
        <p>{product.face}</p>
      </div>
    );
  }
}