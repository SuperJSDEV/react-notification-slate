
import { Editor, Mark, Raw } from '../..'
import React from 'react'
import initialState from './state.json'

/**
 * Node renderers.
 *
 * @type {Object}
 */

const NODES = {
  'block-quote': props => <blockquote>{props.children}</blockquote>,
  'bulleted-list': props => <ul>{props.chidlren}</ul>,
  'heading-one': props => <h1>{props.children}</h1>,
  'heading-two': props => <h2>{props.children}</h2>,
  'list-item': props => <li>{props.chidlren}</li>,
  'numbered-list': props => <ol>{props.children}</ol>,
  'paragraph': props => <p>{props.children}</p>
}

/**
 * Mark renderers.
 *
 * @type {Object}
 */

const MARKS = {
  bold: {
    fontWeight: 'bold'
  },
  code: {
    fontFamily: 'monospace',
    backgroundColor: '#eee',
    padding: '3px',
    borderRadius: '4px'
  },
  italic: {
    fontStyle: 'italic'
  },
  underlined: {
    textDecoration: 'underline'
  }
}

/**
 * The rich text example.
 *
 * @type {Component}
 */

class RichText extends React.Component {

  state = {
    state: Raw.deserialize(initialState)
  };

  hasMark = (type) => {
    const { state } = this.state
    return state.marks.some(mark => mark.type == type)
  }

  hasBlock = (type) => {
    const { state } = this.state
    return state.blocks.some(node => node.type == type)
  }

  onClickMark = (e, type) => {
    e.preventDefault()
    const isActive = this.hasMark(type)
    let { state } = this.state

    state = state
      .transform()
      [isActive ? 'unmark' : 'mark'](type)
      .apply()

    this.setState({ state })
  }

  onClickBlock = (e, type) => {
    e.preventDefault()
    const isActive = this.hasBlock(type)
    let { state } = this.state

    state = state
      .transform()
      .setBlock(isActive ? 'paragraph' : type)
      .apply()

    this.setState({ state })
  }

  render = () => {
    return (
      <div>
        {this.renderToolbar()}
        {this.renderEditor()}
      </div>
    )
  }

  renderToolbar = () => {
    return (
      <div className="menu toolbar-menu">
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
        {this.renderBlockButton('heading-one', 'looks_one')}
        {this.renderBlockButton('heading-two', 'looks_two')}
        {this.renderBlockButton('block-quote', 'format_quote')}
        {this.renderBlockButton('numbered-list', 'format_list_numbered')}
        {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
      </div>
    )
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)
    const onMouseDown = e => this.onClickMark(e, type)

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }

  renderBlockButton = (type, icon) => {
    const isActive = this.hasBlock(type)
    const onMouseDown = e => this.onClickBlock(e, type)

    return (
      <span className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <span className="material-icons">{icon}</span>
      </span>
    )
  }

  renderEditor = () => {
    return (
      <div className="editor">
        <Editor
          state={this.state.state}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          onChange={this.onChange}
        />
      </div>
    )
  }

  renderNode = (node) => {
    return NODES[node.type]
  }

  renderMark = (mark) => {
    return MARKS[mark.type]
  }

  onChange = (state) => {
    console.groupCollapsed('Change!')
    console.log('Document:', state.document.toJS())
    console.log('Selection:', state.selection.toJS())
    console.log('Content:', Raw.serialize(state))
    console.groupEnd()
    this.setState({ state })
  }

}

/**
 * Export.
 */

export default RichText
