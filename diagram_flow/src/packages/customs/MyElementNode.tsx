import React, { memo, CSSProperties, useState } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import XmlElement, {XmlContentProps, SimpleElement} from './XmlElementNode';
import styled from '@emotion/styled';

/**
 * XML Element Node
 */
const RootElementNode: React.FC<NodeProps> = ({ ...data }) => {
  return (
    <>
      <XmlElement {...data}>
        desc: <input type='text' style={{width: 50, height: 10}} />
      </XmlElement>
    </>
  );
};

export const SimpleElementNode: React.FC<XmlContentProps> = ({ ...data }) => {
  return (
    <>
      <SimpleElement {...data}>
        
      </SimpleElement>
    </>
  );
};


export const EntitiesElementNode: React.FC<XmlContentProps> = ({ ...data }) => {
  return (
    <>
      <XmlElement {...data}>
        <div />
      </XmlElement>
    </>
  );
};

export const StoryboardElementNode: React.FC<XmlContentProps> = ({ ...data }) => {
  return (
    <>
      <XmlElement {...data}>
        <div />
      </XmlElement>
    </>
  );
};

export const VehicleElementNode: React.FC<XmlContentProps> = ({ ...data }) => {
  return (
    <>
      <XmlElement {...data}>
        <div>
          name: <input type='text' style={{width: 50, height: 10}} />
        </div>
        <div>
          category:
          <select>
            <option value="car" selected>Car</option>
            <option value="Bike">Bike</option>
          </select>
        </div>
      </XmlElement>
    </>
  );
};

export default memo(RootElementNode);
