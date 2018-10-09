/** @jsx h */

import React from 'react'
import h from '../../helpers/h'

function Image(props) {
  return React.createElement('img', {
    className: props.isFocused ? 'focused' : '',
    src: props.node.data.get('src'),
    ...props.attributes,
  })
}

function renderNode(props) {
  switch (props.node.type) {
    case 'image':
      return Image(props)
  }
}

export const props = {
  renderNode,
  schema: {
    blocks: {
      image: {
        isVoid: true,
      },
    },
  },
}

export const value = (
  <value>
    <document>
      <paragraph>
        <text key="a">
          <anchor />
        </text>
      </paragraph>
      <image src="https://example.com/image.png">
        <text />
      </image>
      <paragraph>
        <text key="b">
          <focus />
        </text>
      </paragraph>
      <image src="https://example.com/image2.png">
        <text />
      </image>
    </document>
  </value>
)

export const output = `
<div data-slate-editor="true" contenteditable="true" role="textbox">
  <div style="position:relative">
    <span>
      <span>
        <span data-slate-zero-width="n">&#xFEFF;</span>
      </span>
    </span>
  </div>
  <div data-slate-void="true">
    <div data-slate-spacer="true" style="height:0;color:transparent;outline:none;position:absolute">
      <span>
        <span>
          <span data-slate-zero-width="z">&#xFEFF;</span>
        </span>
      </span>
    </div>
    <div contenteditable="false">
      <img class="focused" src="https://example.com/image.png">
    </div>
  </div>
  <div style="position:relative">
    <span>
      <span>
        <span data-slate-zero-width="n">&#xFEFF;</span>
      </span>
    </span>
  </div>
  <div data-slate-void="true">
    <div data-slate-spacer="true" style="height:0;color:transparent;outline:none;position:absolute">
      <span>
        <span>
          <span data-slate-zero-width="z">&#xFEFF;</span>
        </span>
      </span>
    </div>
    <div contenteditable="false">
      <img class="" src="https://example.com/image2.png">
    </div>
  </div>
</div>
`.trim()
