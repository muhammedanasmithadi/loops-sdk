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
(0, node_test_1.describe)('WorkflowNodeWithRevisionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOOPS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LoopsSDK.test();
        const ent = testsdk.WorkflowNodeWithRevision();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOOPS_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'workflow_node_with_revision.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "workflowRevisionId": { "a": true, "h": "Workflow Revision Id", "n": "workflowRevisionId", "r": true, "sh": "The current workflow revision token.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "workflowRevisionId", "index$": 0 } }, "name": "workflow_node_with_revision", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/workflows/{workflowId}/nodes/{nodeId}/add-branch", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "node_id", "or": "nodeId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "workflow_id", "or": "workflowId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/v1/workflows/{workflowId}/nodes/{nodeId}/add-branch", "q": { "$action": "add_branch", "exist": ["node_id", "workflow_id"] }, "r": { "param": { "nodeId": "node_id", "workflowId": "workflow_id" } }, "s": [{ "lit": "v1" }, { "lit": "workflows" }, { "var": "workflow_id" }, { "lit": "nodes" }, { "var": "node_id" }, { "lit": "add-branch" }], "t": { "req": { "expectedRevisionId": "`reqdata.expected_revision_id`" }, "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v1/workflows/{workflowId}/nodes/{nodeId}/reroute", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "node_id", "or": "nodeId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "workflow_id", "or": "workflowId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/v1/workflows/{workflowId}/nodes/{nodeId}/reroute", "q": { "$action": "reroute", "exist": ["node_id", "workflow_id"] }, "r": { "param": { "nodeId": "node_id", "workflowId": "workflow_id" } }, "s": [{ "lit": "v1" }, { "lit": "workflows" }, { "var": "workflow_id" }, { "lit": "nodes" }, { "var": "node_id" }, { "lit": "reroute" }], "t": { "req": { "expectedRevisionId": "`reqdata.expected_revision_id`", "newTargetNodeId": "`reqdata.new_target_node_id`" }, "res": "`body.workflow`" }, "index$": 1 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/workflows/{workflowId}/nodes/{nodeId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "node_id", "or": "nodeId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "workflow_id", "or": "workflowId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/workflows/{workflowId}/nodes/{nodeId}", "q": { "exist": ["node_id", "workflow_id"] }, "r": { "param": { "nodeId": "node_id", "workflowId": "workflow_id" } }, "s": [{ "lit": "v1" }, { "lit": "workflows" }, { "var": "workflow_id" }, { "lit": "nodes" }, { "var": "node_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.workflow"]] }, "key$": "workflow_node_with_revision", "name__orig": "workflow_node_with_revision", "Name": "WorkflowNodeWithRevision", "name_": "workflow_node_with_revision", "name-": "workflow-node-with-revision", "NAME": "WORKFLOW_NODE_WITH_REVISION", "index$": 35 }, { "active": true, "entity": "workflow_node_with_revision", "key$": "BasicWorkflowNodeWithRevisionFlow", "kind": "basic", "name": "BasicWorkflowNodeWithRevisionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "workflow_node_with_revision_ref01" }, "m": { "node_id": "node01", "workflow_id": "workflow01" }, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": { "ref": "workflow_node_with_revision_ref01", "srcdatavar": "workflow_node_with_revision_ref01_data", "suffix": "_dt0" }, "m": { "id": "workflow_node_with_revision01", "workflow_id": "workflow01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-workflow_node_with_revision_ref01" } }] }] }, 'WorkflowNodeWithRevision', { "POST /v1/workflows/{workflowId}/nodes/{nodeId}/add-branch": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "expectedRevisionId": { "type": ["string", "null"], "description": "The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.", "x-ref": "#/components/schemas/WorkflowExpectedRevisionId" } }, "required": ["expectedRevisionId"], "additionalProperties": false, "x-ref": "#/components/schemas/AddWorkflowBranchRequest" } } } }, "parameters": [{ "name": "workflowId", "in": "path", "required": true, "description": "The ID of the workflow.", "schema": { "type": "string" }, "index$": 0 }, { "name": "nodeId", "in": "path", "required": true, "description": "The ID of the BranchNode or ExperimentBranchNode that should receive one new child.", "schema": { "type": "string" }, "index$": 1 }] }, "POST /v1/workflows/{workflowId}/nodes/{nodeId}/reroute": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "Reroute the source node's only outgoing connection to `newTargetNodeId`.", "properties": { "expectedRevisionId": { "type": ["string", "null"], "description": "The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.", "x-ref": "#/components/schemas/WorkflowExpectedRevisionId" }, "newTargetNodeId": { "type": "string", "description": "The valid workflow node that should receive the connection from the source node.", "examples": ["cln3c5d7e9f1g3h5i7j9k1l3"] } }, "required": ["expectedRevisionId", "newTargetNodeId"], "additionalProperties": false, "examples": [{ "expectedRevisionId": "clx7a3b5c7d9e1f3g5h7i9j1", "newTargetNodeId": "cln3c5d7e9f1g3h5i7j9k1l3" }], "x-ref": "#/components/schemas/RerouteNodeConnectionRequest" } } } }, "parameters": [{ "name": "workflowId", "in": "path", "required": true, "description": "The ID of the workflow.", "schema": { "type": "string", "examples": ["clw1a3b5c7d9e1f3g5h7i9j1"] }, "index$": 0 }, { "name": "nodeId", "in": "path", "required": true, "description": "The ID of the source workflow node whose outgoing connection should be moved.", "schema": { "type": "string", "examples": ["cln1a3b5c7d9e1f3g5h7i9j1"] }, "index$": 1 }] }, "GET /v1/workflows/{workflowId}/nodes/{nodeId}": { "protocol": "http", "parameters": [{ "name": "workflowId", "in": "path", "required": true, "description": "The ID of the workflow.", "schema": { "type": "string", "examples": ["clw1a3b5c7d9e1f3g5h7i9j1"] }, "index$": 0 }, { "name": "nodeId", "in": "path", "required": true, "description": "The ID of the workflow node.", "schema": { "type": "string", "examples": ["cln8p0q2r4s6t8u0v2w4x6z8"] }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const workflow_node_with_revision_ref01_ent = client.WorkflowNodeWithRevision();
        let workflow_node_with_revision_ref01_data = setup.data.new.workflow_node_with_revision['workflow_node_with_revision_ref01'];
        workflow_node_with_revision_ref01_data['node_id'] = setup.idmap['node01'];
        workflow_node_with_revision_ref01_data['workflow_id'] = setup.idmap['workflow01'];
        workflow_node_with_revision_ref01_data = (await workflow_node_with_revision_ref01_ent.create(workflow_node_with_revision_ref01_data)).data();
        (0, node_assert_1.default)(null != workflow_node_with_revision_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/workflow_node_with_revision/WorkflowNodeWithRevisionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LoopsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['workflow_node_with_revision01', 'workflow_node_with_revision02', 'workflow_node_with_revision03', 'workflow01', 'workflow02', 'workflow03', 'node01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOOPS_TEST_WORKFLOW_NODE_WITH_REVISION_ENTID': idmap,
        'LOOPS_TEST_LIVE': 'FALSE',
        'LOOPS_TEST_EXPLAIN': 'FALSE',
        'LOOPS_APIKEY': '',
    });
    idmap = env['LOOPS_TEST_WORKFLOW_NODE_WITH_REVISION_ENTID'];
    const live = 'TRUE' === env.LOOPS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOOPS_TEST_WORKFLOW_NODE_WITH_REVISION_ENTID'];
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
//# sourceMappingURL=WorkflowNodeWithRevisionEntity.test.js.map