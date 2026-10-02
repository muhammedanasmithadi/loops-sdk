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
(0, node_test_1.describe)('CreateWorkflowNodeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOOPS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LoopsSDK.test();
        const ent = testsdk.CreateWorkflowNode();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOOPS_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'create_workflow_node.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "node": { "a": true, "h": "Node", "n": "node", "r": true, "t": "`$ANY`", "union": { "branches": 3, "count": 2, "depth": 15 }, "key$": "node", "index$": 0 }, "workflow": { "a": true, "h": "Workflow", "n": "workflow", "r": true, "t": "`$OBJECT`", "union": { "branches": 3, "count": 1, "depth": 13 }, "key$": "workflow", "index$": 1 } }, "name": "create_workflow_node", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/workflows/{workflowId}/nodes", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "workflow_id", "or": "workflowId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v1/workflows/{workflowId}/nodes", "q": { "exist": ["workflow_id"] }, "r": { "param": { "workflowId": "workflow_id" } }, "s": [{ "lit": "v1" }, { "lit": "workflows" }, { "var": "workflow_id" }, { "lit": "nodes" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.workflow"]] }, "key$": "create_workflow_node", "name__orig": "create_workflow_node", "Name": "CreateWorkflowNode", "name_": "create_workflow_node", "name-": "create-workflow-node", "NAME": "CREATE_WORKFLOW_NODE", "index$": 15 }, { "active": true, "entity": "create_workflow_node", "key$": "BasicCreateWorkflowNodeFlow", "kind": "basic", "name": "BasicCreateWorkflowNodeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "create_workflow_node_ref01" }, "m": { "workflow_id": "workflow01" }, "o": "create", "s": [], "v": [] }] }, 'CreateWorkflowNode', { "POST /v1/workflows/{workflowId}/nodes": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "oneOf": [{ "type": "object", "description": "Insert a new node between two existing nodes, `fromNodeId` and `toNodeId`. When `fromNodeId` is an `ExperimentBranchNode`, `nodeTypeName` must be `VariantNode`, and `toNodeId` cannot already be a `VariantNode`; use add-branch to add sibling variants. Branch paths can be edited with create-node, but a workflow cannot be started unless each direct `BranchNode` child is an `AudienceFilter`.", "properties": { "expectedRevisionId": { "type": ["string", "null"], "description": "The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.", "x-ref": "#/components/schemas/WorkflowExpectedRevisionId" }, "insertMode": { "type": "string", "enum": ["between"] }, "nodeTypeName": { "type": "string", "enum": ["AudienceFilter", "BranchNode", "ExperimentBranchNode", "TimerAction", "SendEmailAction", "VariantNode"], "description": "Node types that can be created with the API. `*Trigger` nodes and `ExitAction` nodes cannot be created.", "x-ref": "#/components/schemas/CreateWorkflowNodeTypeName" }, "fromNodeId": { "type": "string", "description": "The node to insert after. This node must currently point to `toNodeId`. If this is an `ExperimentBranchNode`, `nodeTypeName` must be `VariantNode` and `toNodeId` cannot already be a `VariantNode`." }, "toNodeId": { "type": "string", "description": "The node to insert before." } }, "required": ["expectedRevisionId", "insertMode", "nodeTypeName", "fromNodeId", "toNodeId"], "additionalProperties": false, "x-ref": "#/components/schemas/CreateWorkflowNodeBetweenRequest" }, { "type": "object", "description": "Insert a new node before `toNodeId`. `VariantNode` cannot use `insertMode: \"before\"`; to restore a missing variant path, use `insertMode: \"between\"` with the experiment branch as `fromNodeId`.", "properties": { "expectedRevisionId": { "type": ["string", "null"], "description": "The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.", "x-ref": "#/components/schemas/WorkflowExpectedRevisionId" }, "insertMode": { "type": "string", "enum": ["before"] }, "nodeTypeName": { "type": "string", "enum": ["AudienceFilter", "BranchNode", "ExperimentBranchNode", "TimerAction", "SendEmailAction", "VariantNode"], "description": "Node types that can be created with the API. `*Trigger` nodes and `ExitAction` nodes cannot be created.", "x-ref": "#/components/schemas/CreateWorkflowNodeTypeName" }, "toNodeId": { "type": "string", "description": "The node to insert before. The target must have at least one incoming parent and cannot be a trigger node." }, "beforeNodeId": { "type": "string", "description": "Deprecated. Use `toNodeId` instead.", "deprecated": true } }, "required": ["expectedRevisionId", "insertMode", "nodeTypeName"], "oneOf": [{ "properties": { "toNodeId": {} }, "required": ["toNodeId"] }, { "properties": { "beforeNodeId": {} }, "required": ["beforeNodeId"] }], "additionalProperties": false, "x-ref": "#/components/schemas/CreateWorkflowNodeBeforeRequest" }, { "type": "object", "description": "Insert a new node after `fromNodeId`. This is valid only when `fromNodeId` has exactly one outgoing node. It is invalid when `fromNodeId` has no outgoing nodes, multiple outgoing nodes, or is an exit node. When the source has multiple outgoing nodes, use `between` with the exact `toNodeId` instead.", "properties": { "expectedRevisionId": { "type": ["string", "null"], "description": "The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.", "x-ref": "#/components/schemas/WorkflowExpectedRevisionId" }, "insertMode": { "type": "string", "enum": ["after"] }, "nodeTypeName": { "type": "string", "enum": ["AudienceFilter", "BranchNode", "ExperimentBranchNode", "TimerAction", "SendEmailAction", "VariantNode"], "description": "Node types that can be created with the API. `*Trigger` nodes and `ExitAction` nodes cannot be created.", "x-ref": "#/components/schemas/CreateWorkflowNodeTypeName" }, "fromNodeId": { "type": "string", "description": "The node to insert after. This node must currently have exactly one outgoing node." } }, "required": ["expectedRevisionId", "insertMode", "nodeTypeName", "fromNodeId"], "additionalProperties": false, "x-ref": "#/components/schemas/CreateWorkflowNodeAfterRequest" }], "description": "Create a new workflow node with an explicit `insertMode`. To configure the node after creation, use the `POST /v1/workflows/{workflowId}/nodes/{nodeId}` endpoint.", "discriminator": { "propertyName": "insertMode", "mapping": { "between": "#/components/schemas/CreateWorkflowNodeBetweenRequest", "before": "#/components/schemas/CreateWorkflowNodeBeforeRequest", "after": "#/components/schemas/CreateWorkflowNodeAfterRequest" } }, "x-ref": "#/components/schemas/CreateWorkflowNodeRequest", "index$": 1 } } } }, "parameters": [{ "name": "workflowId", "in": "path", "required": true, "description": "The ID of the workflow.", "schema": { "type": "string" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const create_workflow_node_ref01_ent = client.CreateWorkflowNode();
        let create_workflow_node_ref01_data = setup.data.new.create_workflow_node['create_workflow_node_ref01'];
        create_workflow_node_ref01_data['workflow_id'] = setup.idmap['workflow01'];
        create_workflow_node_ref01_data = (await create_workflow_node_ref01_ent.create(create_workflow_node_ref01_data)).data();
        (0, node_assert_1.default)(null != create_workflow_node_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/create_workflow_node/CreateWorkflowNodeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LoopsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['create_workflow_node01', 'create_workflow_node02', 'create_workflow_node03', 'workflow01', 'workflow02', 'workflow03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOOPS_TEST_CREATE_WORKFLOW_NODE_ENTID': idmap,
        'LOOPS_TEST_LIVE': 'FALSE',
        'LOOPS_TEST_EXPLAIN': 'FALSE',
        'LOOPS_APIKEY': '',
    });
    idmap = env['LOOPS_TEST_CREATE_WORKFLOW_NODE_ENTID'];
    const live = 'TRUE' === env.LOOPS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOOPS_TEST_CREATE_WORKFLOW_NODE_ENTID'];
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
//# sourceMappingURL=CreateWorkflowNodeEntity.test.js.map