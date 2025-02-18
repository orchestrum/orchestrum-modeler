/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import BpmnModeler from 'camunda-bpmn-js/lib/camunda-cloud/Modeler';

import addExporterModule from '@bpmn-io/add-exporter';

import completeDirectEditingModule from '../../bpmn/modeler/features/complete-direct-editing';
import globalClipboardModule from './features/global-clipboard';
import handToolOnSpaceModule from '../../bpmn/modeler/features/hand-tool-on-space';
import propertiesPanelKeyboardBindingsModule from '../../bpmn/modeler/features/properties-panel-keyboard-bindings';

import Flags, {
  DISABLE_ADJUST_ORIGIN,
  ENABLE_ZEEBE_USER_TASKS
} from '../../../../util/Flags';

import 'camunda-bpmn-js/dist/assets/camunda-cloud-modeler.css';


export default class CloudBpmnModeler extends BpmnModeler {

  constructor(options = {}) {

    const {
      moddleExtensions,
      ...otherOptions
    } = options;

    super({
      ...otherOptions,
      moddleExtensions: moddleExtensions || {},
      disableAdjustOrigin: Flags.get(DISABLE_ADJUST_ORIGIN),
      enableZeebeUserTasks: Flags.get(ENABLE_ZEEBE_USER_TASKS),
    });
  }
}

const defaultModules = BpmnModeler.prototype._modules;

const extensionModules = [
  addExporterModule,
  completeDirectEditingModule,
  globalClipboardModule,
  handToolOnSpaceModule,
  propertiesPanelKeyboardBindingsModule,
];

CloudBpmnModeler.prototype._modules = [
  ...defaultModules,
  ...extensionModules
];
