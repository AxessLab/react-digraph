// @flow

import * as React from 'react';

import { shallow } from 'enzyme';

import NodeText from '../../src/components/node-text';

describe('NodeText component', () => {
  let output = null;
  let nodeData;
  let nodeTypes;

  beforeEach(() => {
    nodeData = {
      title: 'Test',
    };
    output = shallow(<NodeText data={nodeData} isSelected={false} />);
  });

  describe('render method', () => {
    it('renders', () => {
      expect(output.props().className).toEqual('node-text');
      const tspan = output.find('tspan');
      const title = output.find('title');

      expect(tspan.at(0).text()).toEqual('Test');
      expect(tspan.at(0).props().x).toEqual(0);
      expect(title.at(0).text()).toEqual('Test');
    });

    it('renders as selected', () => {
      output.setProps({
        isSelected: true,
      });
      expect(output.props().className).toEqual('node-text selected');
    });

    it('does not render a title element when there is no title', () => {
      nodeData.title = null;
      output.setProps({
        nodeData,
      });
      const title = output.find('title');

      expect(title.length).toEqual(0);
    });

    it('truncates node title characters when maxTitleChars is supplied', () => {
      output.setProps({
        maxTitleChars: 2,
      });
      const tspan = output.find('tspan');

      expect(tspan.text()).toEqual('Te');
    });
  });
});
