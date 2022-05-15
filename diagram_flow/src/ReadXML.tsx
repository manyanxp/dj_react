import xml2js from "xml2js";
import { testxml } from "./testdata";
import ReactFlow, {
  Node,
  Edge,
  Position,
  XYPosition,
} from 'react-flow-renderer';
import { create } from "domain";

export const getXML = (data: any, debug?: boolean) => {
  var xmlresult: any;
  xml2js.parseString(testxml, (err, result) => {
    if(err) {
      throw err;
    }

    // `result` is a JavaScript object
    // convert it to a JSON string
    const json = JSON.stringify(result, null, 4);

    xmlresult = result;
  });

  if (debug) {
    // log JSON string
    console.log(xmlresult.OpenSCENARIO.FileHeader[0].$.author);
  }
  xmlresult.OpenSCENARIO.FileHeader[0].$.author = "test";
  console.log(xmlresult.OpenSCENARIO.FileHeader[0].$.author);
  if (xmlresult.Test == undefined) {
    console.log('NG');
  } else {
    console.log('OK');
  }
  return xmlresult
}

const CLUMN_POSITION = {
  POS1: 120,
  POS2: 120,
  POS3: 150,
  POS4: 250,
  POS5: 300,
} as const;
type CLUMN_POSITION = typeof CLUMN_POSITION[keyof typeof CLUMN_POSITION];

/**
 * ===========================================================================
 * Node Create
 * ===========================================================================
 */
export const getOpenScenarioNode = (id: string) => {
  const data:Node = {
    id: id,
    type: 'xmlNode',
    data: { label: 'OpenSCENARIO' },
    position: { x: -200, y: -150 },
    sourcePosition: Position.Right,
  }
  return data;
};

/**
 * シナリオエレメントの抽象クラス
 */
abstract class ScenarioElement {
  protected id: string;
  protected parent_node: Node;
  protected group_id?: string;

  constructor(id: string, parent: Node) {
    this.id = id;
    this.parent_node = parent;
  }

  abstract createNode(): Node;
  abstract getNode(): Node;
  abstract getEdge(): Edge;

  createEge = (source: Node, target: Node) => {
    const id = "e-" + source.id + "-" + target.id;
    const data: Edge = { 
      id: id, 
      source: source.id, 
      target: target.id, 
      animated: true, 
      style: { stroke: '#fff' }
    }
    return data;
  };
}

/**
 * EntitiesElement
 */
class EntitiesElement extends ScenarioElement {
  protected self_node: Node;
  constructor(id: string, parent: Node) {
    super(id, parent);
    this.self_node = this.createNode();
  }

  createNode = () : Node => {
    const x: number = this.parent_node.position.x + CLUMN_POSITION.POS1;
    const y: number = this.parent_node.position.y;

    return {
      id: this.id,
      type: 'simpleNode',
      data: { label: 'Entities' },
      position: { x: x, y: y },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };
  }

  getNode = () : Node => {
    return this.self_node;
  }

  getEdge = () : Edge => {
    return this.createEge(this.parent_node, this.self_node);
  }
};

/**
 * StoryBoardElement
 */
class StoryBoardElement extends ScenarioElement {
  protected self_node: Node;
  constructor(id: string, parent: Node, position?:XYPosition) {
    super(id, parent);
    this.self_node = this.createNode(position);
  }

  createNode = (position?:XYPosition) : Node => {
    let x: number = this.parent_node.position.x + CLUMN_POSITION.POS1;
    let y: number = this.parent_node.position.y + 50;

    if (position != undefined){
      y = y + position.y;
    }

    return {
      id: this.id,
      type: 'simpleNode',
      data: { label: 'StoryBoard' },
      position: { x: x, y: y },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };
  }

  getNode = () : Node => {
    return this.self_node;
  }

  getEdge = () : Edge => {
    return this.createEge(this.parent_node, this.self_node);
  }
};

/**
 * ScenarioObjectElement
 */
class ScenarioObjectElement extends ScenarioElement {
  protected self_node: Node;
  constructor(id: string, parent: Node,  position?:XYPosition) {
    super(id, parent);
    this.self_node = this.createNode(position);
  }

  createNode = ( position?:XYPosition) : Node => {
    let x: number = this.parent_node.position.x + CLUMN_POSITION.POS2;
    let y: number = this.parent_node.position.y;
    
    if (position != undefined){
      y = y + position.y;
    }
    
    const type = 'scenario-object';
    const data:Node = {
      id: type + '-' + this.id,
      type: 'xmlNode',
      data: { label: 'ScenarioObject' },
      position: { x: x, y: y },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    return data;
  }

  getNode = () : Node => {
    return this.self_node;
  }

  getEdge = () : Edge => {
    return this.createEge(this.parent_node, this.self_node);
  }
};

/**
 * VehicleElement
 */
 class VehicleElement extends ScenarioElement {
  protected self_node: Node;
  constructor(id: string, parent: Node, position?:XYPosition) {
    super(id, parent);
    this.self_node = this.createNode(position);
  }

  createNode = (position?:XYPosition) : Node => {
    let x: number = this.parent_node.position.x + CLUMN_POSITION.POS3;
    let y: number = this.parent_node.position.y;  

    if (position != undefined){
      y = y + position.y;
    }

    const type = 'vhicle';
    return {
      id: type + '-' + this.id,
      type: 'vehicleNode',
      data: { label: 'Vehicle' },
      position: { x: x, y: y},
      targetPosition: Position.Left,
    };
  }

  getNode = () : Node => {
    return this.self_node;
  }

  getEdge = () : Edge => {
    return this.createEge(this.parent_node, this.self_node);
  }
};

export class OpenScenarioElement {
  protected nodes: Node[] = [];
  protected edges: Edge[] = [];
  protected element: any;

  constructor (data: any) {
    this.element = data;
  }

  createElement = () => {
    if (this.element.OpenSCENARIO != undefined) {
      const open_scenario = this.element.OpenSCENARIO;
      const open_scenario_node = getOpenScenarioNode('open-scenario')
      this.nodes.push(open_scenario_node)

      if (open_scenario.Entities != undefined) {
        const entities_element: EntitiesElement = new EntitiesElement('entities', open_scenario_node);

        // const entities_node = getEntities('entities', open_scenario_node)
        this.nodes.push(entities_element.getNode());
        this.edges.push(entities_element.getEdge());

        let object_pos: XYPosition = {x: 0, y: 0};
        let vehicle_pos: XYPosition = {x: 0, y: 0};

        for(const value of open_scenario.Entities[0].ScenarioObject) {
          const scenario_object_element: ScenarioObjectElement =
          new ScenarioObjectElement(value.$.name, entities_element.getNode(), object_pos);
          this.nodes.push(scenario_object_element.getNode())
          this.edges.push(scenario_object_element.getEdge())

          if (value.Vehicle != undefined) {
            const vehicle_element:VehicleElement
            = new VehicleElement(value.$.name, scenario_object_element.getNode(), vehicle_pos)
            this.nodes.push(vehicle_element.getNode());
            this.edges.push(vehicle_element.getEdge())
            vehicle_pos.y += 50;
          }

          object_pos.y += 100;
        }

        const storyboard_element: StoryBoardElement = new StoryBoardElement('storyboard', open_scenario_node);

        // const entities_node = getEntities('entities', open_scenario_node)
        this.nodes.push(storyboard_element.getNode());
        this.edges.push(storyboard_element.getEdge());

      }
    }
  }

  getNodes = () : Node[] => {
     return this.nodes;
  }

  getEdeges = () : Edge[] => {
     return this.edges;
  }
};


const createOpenScenarioNodes = () => {
  const data = getXML("");
  const element = new OpenScenarioElement(data);
  element.createElement();
  console.log(element.getNodes());
  console.log(element.getEdeges());
  return element
};

export default createOpenScenarioNodes;
