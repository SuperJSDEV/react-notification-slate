/** @jsx jsx */

import { Editor } from 'slate'
import { jsx } from '../../..'

export const run = editor => {
  Editor.unwrapNodes(editor, { match: n => n.a, mode: 'all' })
}

export const input = (
  <editor>
    <block a>
      <block a>
        <block>
          <anchor />
          one
        </block>
      </block>
      <block a>
        <block>
          two
          <focus />
        </block>
      </block>
      <block a>
        <block>three</block>
      </block>
    </block>
  </editor>
)

export const output = (
  <editor>
    <block>
      <anchor />
      one
    </block>
    <block>
      two
      <focus />
    </block>
    <block a>
      <block>three</block>
    </block>
  </editor>
)
