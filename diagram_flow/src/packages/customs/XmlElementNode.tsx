/**
 * XML Element Node
 */
import React, { memo, CSSProperties, useState } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import './XmlElementNode.css';

const targetHandleStyle: CSSProperties = { background: '#555' };
const sourceHandleStyle: CSSProperties = { ...targetHandleStyle, };
const onConnect = (params: Connection | Edge) => console.log('handle onConnect', params);

/**
 * XML Content Style
 */
export const styleXmlContentBody: React.CSSProperties = {
  padding: 2,
  color: '#ffffff',
};

export const styleXmlContentHeader: React.CSSProperties = {
  padding: 2,
  fontWeight: "bolder",
  borderStartStartRadius: 2,
  borderStartEndRadius: 2,
  borderTopWidth: 2,
  borderLeftWidth: 2,
  borderRightWidth: 2,
  borderColor: '#dddddd',
  fontSize: 10,
  backgroundColor: '#006699',
  textAlign: "center",
};

export const styleXmlContent: React.CSSProperties = {
  padding: 2,
  borderLeftWidth: 2,
  borderRightWidth: 2,
  borderColor: '#dddddd',
  fontSize: 5,
  backgroundColor: '#cccccc',
};

export const styleXmlContentFooter: React.CSSProperties = {
  padding: 2,
  minHeight: 5,
  borderEndStartRadius: 2,
  borderEndEndRadius: 2,
  borderBottomWidth: 2,
  borderLeftWidth: 2,
  borderRightWidth: 2,
  borderColor: '#dddddd',
  backgroundColor: '#006699',
};


/**
 * XML Content
 */
export type XmlContentProps = NodeProps & {
  attribute?: string;
  headerSytle?: CSSProperties;
}

type AttributeComponetsProps = {
  type?: string;
}

type headerBgStyle = 'default' | 'primary' | 'secondary' | 'danger';

const XmlElement: React.FC<XmlContentProps> = ({id, data, isConnectable, children}) => {
  return(
      <>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <div className='xml-content-body' style={styleXmlContentBody}>
        <div className='xml-content-header' style={styleXmlContentHeader}>
          {data.label}
        </div>
        <div className='xml-content' style={styleXmlContent}>
          {children}
        </div>
        <div className='xml-content-footer' style={styleXmlContentFooter}>
          {id}
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="a" style={sourceHandleStyle} isConnectable={isConnectable} />
    </>
  );
}

export const styleSimpleContentHeader: React.CSSProperties = {
  padding: 2,
  fontWeight: "bolder",
  borderRadius: 2,
  borderTopWidth: 2,
  borderLeftWidth: 2,
  borderRightWidth: 2,
  borderColor: '#dddddd',
  fontSize: 10,
  backgroundColor: '#006699',
  textAlign: "center",
};

export const SimpleElement: React.FC<XmlContentProps> = ({id, data, isConnectable, children}) => {
  return(
      <>
      <Handle type="target" position={Position.Left} style={targetHandleStyle} onConnect={onConnect} />
      <div className='xml-content-body' style={styleXmlContentBody}>
        <div className='xml-content-header' style={styleSimpleContentHeader}>
          {data.label}
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="a" style={sourceHandleStyle} isConnectable={isConnectable} />
    </>
  );
}

export default memo(XmlElement);
