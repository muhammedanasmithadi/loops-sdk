"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('UpdateWorkflowNodeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOOPS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LoopsSDK.test();
        const ent = testsdk.UpdateWorkflowNode();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOOPS_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'update_workflow_node.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "The description of the workflow.", "t": "`$STRING`", "key$": "description", "index$": 0 }, "expectedRevisionId": { "a": true, "h": "Expected Revision Id", "n": "expectedRevisionId", "r": true, "sh": "The workflow revision token returned by the latest workflow read or mutation.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "expectedRevisionId", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "The ID of the workflow.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "mailingListId": { "a": true, "h": "Mailing List Id", "n": "mailingListId", "r": true, "sh": "The ID of the mailing list the workflow sends to.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "mailingListId", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name of the workflow.", "t": "`$STRING`", "key$": "name", "index$": 4 }, "nodes": { "a": true, "h": "Nodes", "n": "nodes", "r": true, "sh": "A map of node IDs to simplified node objects.", "t": "`$OBJECT`", "union": { "branches": 3, "count": 1, "depth": 11 }, "key$": "nodes", "index$": 5 }, "payload": { "a": true, "h": "Payload", "n": "payload", "r": true, "sh": "Node-type-specific fields to update.", "t": "`$ANY`", "union": { "branches": 8, "count": 3, "depth": 11 }, "key$": "payload", "index$": 6 }, "rootNodeId": { "a": true, "h": "Root Node Id", "n": "rootNodeId", "r": true, "sh": "The ID of the root node in the workflow graph.", "t": "`$STRING`", "key$": "rootNodeId", "index$": 7 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "t": "`$STRING`", "key$": "status", "index$": 8 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": true, "sh": "The URL of the workflow in the Loops app.", "t": "`$STRING`", "key$": "url", "index$": 9 }, "workflowRevisionId": { "a": true, "h": "Workflow Revision Id", "n": "workflowRevisionId", "r": true, "sh": "The current workflow revision token.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "workflowRevisionId", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "update_workflow_node", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/workflows/{workflowId}/nodes/{nodeId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "nodeId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "workflow_id", "or": "workflowId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/v1/workflows/{workflowId}/nodes/{nodeId}", "q": { "exist": ["id", "workflow_id"] }, "r": { "param": { "nodeId": "id", "workflowId": "workflow_id" } }, "s": [{ "lit": "v1" }, { "lit": "workflows" }, { "var": "workflow_id" }, { "lit": "nodes" }, { "var": "id" }], "t": { "req": { "expectedRevisionId": "`reqdata.expected_revision_id`", "payload": "`reqdata.payload`" }, "res": "`body.workflow`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.workflow"]] }, "key$": "update_workflow_node", "name__orig": "update_workflow_node", "Name": "UpdateWorkflowNode", "name_": "update_workflow_node", "name-": "update-workflow-node", "NAME": "UPDATE_WORKFLOW_NODE", "index$": 32 }, { "active": true, "entity": "update_workflow_node", "key$": "BasicUpdateWorkflowNodeFlow", "kind": "basic", "name": "BasicUpdateWorkflowNodeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "update_workflow_node_ref01" }, "m": { "node_id": "node01", "workflow_id": "workflow01" }, "o": "create", "s": [], "v": [] }] }, 'UpdateWorkflowNode', { "POST /v1/workflows/{workflowId}/nodes/{nodeId}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "expectedRevisionId": { "type": ["string", "null"], "description": "The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.", "x-ref": "#/components/schemas/WorkflowExpectedRevisionId", "key$": "expectedRevisionId" }, "payload": { "anyOf": [{ "type": "object", "description": "Changes an existing trigger node to a signup trigger.", "properties": { "typeName": {} }, "required": ["typeName"], "additionalProperties": false, "x-ref": "#/components/schemas/WorkflowSignupTriggerPayload" }, { "type": "object", "description": "Updates an event trigger, or changes an existing trigger node to an event trigger. Assign the event pattern with either `eventPatternId` or `eventName`, not both. Set either field to `null` to clear the event-pattern relationship.", "minProperties": 1, "properties": { "typeName": {}, "eventPatternId": {}, "eventName": {}, "reEligible": {} }, "additionalProperties": false, "x-ref": "#/components/schemas/WorkflowEventTriggerPayload" }, { "type": "object", "description": "Updates a contact-property trigger, or changes an existing trigger node to a contact-property trigger.", "minProperties": 1, "properties": { "typeName": {}, "contactPropertyQuery": {}, "reEligible": {} }, "additionalProperties": false, "x-ref": "#/components/schemas/WorkflowContactPropertyTriggerPayload" }, { "type": "object", "description": "Updates an add-to-list trigger, or changes an existing trigger node to an add-to-list trigger.", "minProperties": 1, "properties": { "typeName": {}, "reEligible": {} }, "additionalProperties": false, "x-ref": "#/components/schemas/WorkflowAddToListTriggerPayload" }, { "type": "object", "minProperties": 1, "description": "Configuration for the audience filter node.", "properties": { "audienceSegmentId": {}, "audienceFilter": {}, "appliesDownstream": {} }, "additionalProperties": false, "x-ref": "#/components/schemas/WorkflowAudienceFilterPayload" }, { "type": "object", "minProperties": 1, "description": "Configuration for the timer action node.", "properties": { "amount": {}, "unit": {} }, "additionalProperties": false, "x-ref": "#/components/schemas/WorkflowTimerActionPayload" }, { "type": "object", "minProperties": 1, "description": "Configuration for the experiment branch node.", "properties": { "samplingRate": {} }, "additionalProperties": false, "x-ref": "#/components/schemas/WorkflowExperimentBranchPayload" }, { "type": "object", "minProperties": 1, "description": "Configuration for the variant node.", "properties": { "isControl": {} }, "additionalProperties": false, "x-ref": "#/components/schemas/WorkflowVariantPayload" }], "description": "Node-type-specific fields to update. The allowed fields depend on the existing node type. Trigger node updates may include `typeName` when changing one trigger node type to another trigger node type.", "x-ref": "#/components/schemas/UpdateWorkflowNodePayload", "key$": "payload" } }, "required": ["expectedRevisionId", "payload"], "additionalProperties": false, "x-ref": "#/components/schemas/UpdateWorkflowNodeRequest", "index$": 1 } } } }, "parameters": [{ "name": "workflowId", "in": "path", "required": true, "description": "The ID of the workflow.", "schema": { "type": "string", "examples": ["clw1a3b5c7d9e1f3g5h7i9j1"] }, "index$": 0 }, { "name": "nodeId", "in": "path", "required": true, "description": "The ID of the workflow node.", "schema": { "type": "string", "examples": ["cln8p0q2r4s6t8u0v2w4x6z8"] }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const update_workflow_node_ref01_ent = client.UpdateWorkflowNode();
        let update_workflow_node_ref01_data = setup.data.new.update_workflow_node['update_workflow_node_ref01'];
        update_workflow_node_ref01_data['node_id'] = setup.idmap['node01'];
        update_workflow_node_ref01_data['workflow_id'] = setup.idmap['workflow01'];
        update_workflow_node_ref01_data = (await update_workflow_node_ref01_ent.create(update_workflow_node_ref01_data)).data();
        (0, node_assert_1.default)(null != update_workflow_node_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/update_workflow_node/UpdateWorkflowNodeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LoopsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['update_workflow_node01', 'update_workflow_node02', 'update_workflow_node03', 'workflow01', 'workflow02', 'workflow03', 'node01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOOPS_TEST_UPDATE_WORKFLOW_NODE_ENTID': idmap,
        'LOOPS_TEST_LIVE': 'FALSE',
        'LOOPS_TEST_EXPLAIN': 'FALSE',
        'LOOPS_APIKEY': '',
    });
    idmap = env['LOOPS_TEST_UPDATE_WORKFLOW_NODE_ENTID'];
    const live = 'TRUE' === env.LOOPS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOOPS_TEST_UPDATE_WORKFLOW_NODE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.LoopsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.LOOPS_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.LOOPS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=UpdateWorkflowNodeEntity.test.js.map