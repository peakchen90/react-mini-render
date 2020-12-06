import React from 'react';

let nextId = 0;

export default class Vnode {
  type: string;
  props: Record<string, any>
  style: string
  children: (Vnode | string)[]
  id: number

  constructor(node: { type: string, props?: Record<string, any> }) {
    const {children, ..._props} = node.props || {};
    this.type = node.type;
    this.props = _props;
    this.children = [];
    this.style = Object.keys(this.props.style || {}).map(k => `${k}: ${this.props.style[k]}`).join(';');
    this.resolveChildren(children, this.children);
    this.id = ++nextId;
  }

  resolveChildren(children, parent: any[] = []) {
    if (Array.isArray(children)) {
      children.forEach(child => {
        this.resolveChildren(child, parent);
      });
    } else if (React.isValidElement<any>(children)) {
      parent.push(new Vnode(children as any));
    } else if (children) {
      parent.push(children);
    }
  }

  appendChild(child) {
    this.children.push(child);
  }

  walk(node, cb) {
    cb(node);
    if(Array.isArray(node.children)) {
      node.children.forEach((child) => {
        this.walk(child, cb);
      });
    }
  }

  toRenderObject() {
    const obj = {
      node: this.children[0],
      triggerEvent: (event, id, evt) => {
        this.walk(this, (node) => {
          if(node.id === id && node.props?.[event]) {
            node.props?.[event](evt);
          }
        });
      }
    };

    return obj;
  }
}
