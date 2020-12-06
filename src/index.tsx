import React from 'react';
import MiniRender from './renderer';
import Demo from './demo';
import Vnode from './renderer/vnode';

declare const Page: (arg: any) => any;
declare const Component: (arg: any) => any;

const render = {
  rootVnode: new Vnode({type: '$$root'}),
  renderObj: {},
  createPage() {
    Page({
      data: {
        renderData: []
      },
      onLoad() {
        MiniRender.render(
          <Demo/>,
          {
            _rootVnode: render.rootVnode
          },
          () => {
            console.log('===== render rootVnode =====>', render.rootVnode);
            render.renderObj = render.rootVnode.toRenderObject();
            this.setData({
              renderData: (render.renderObj as any).node
            });
          }
        );
      }
    });
  },
  createComponent() {
    Component({
      properties: {
        renderData: {
          type: Object,
        }
      },
      data: {
        // renderData: []
      },
      methods: {
        onClick(this: any, e) {
          const id = e.currentTarget.dataset.id;
          (render.renderObj as any).triggerEvent('onClick', id, e);
        }
      }
    });
  }
};

export default render;
