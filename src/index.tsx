import React from 'react';
import MiniRender from './renderer';
import Demo from './demo';

export default {
  init() {
    MiniRender.render(
      <Demo/>,
      {}
    );
  }
};
