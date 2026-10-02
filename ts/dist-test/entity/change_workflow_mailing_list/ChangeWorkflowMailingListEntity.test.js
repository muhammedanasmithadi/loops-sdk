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
(0, node_test_1.describe)('ChangeWorkflowMailingListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOOPS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LoopsSDK.test();
        const ent = testsdk.ChangeWorkflowMailingList();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOOPS_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'change_workflow_mailing_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "dryRun": { "a": true, "h": "Dry Run", "n": "dryRun", "r": false, "sh": "If `true`, the request will be validated but the workflow will not be modified.", "t": "`$BOOLEAN`", "key$": "dryRun", "index$": 0 }, "expectedRevisionId": { "a": true, "h": "Expected Revision Id", "n": "expectedRevisionId", "r": true, "sh": "The workflow revision token returned by the latest workflow read or mutation.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "expectedRevisionId", "index$": 1 }, "mailingListId": { "a": true, "h": "Mailing List Id", "n": "mailingListId", "r": true, "sh": "The mailing list to use for the workflow.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "mailingListId", "index$": 2 }, "queuedContactPolicy": { "a": true, "h": "Queued Contact Policy", "n": "queuedContactPolicy", "r": false, "sh": "`fail` returns queued-contact impact instead of mutating.", "t": "`$STRING`", "key$": "queuedContactPolicy", "index$": 3 } }, "name": "change_workflow_mailing_list", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/workflows/{workflowId}/mailing-list", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "workflow_id", "or": "workflowId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v1/workflows/{workflowId}/mailing-list", "q": { "exist": ["workflow_id"] }, "r": { "param": { "workflowId": "workflow_id" } }, "s": [{ "lit": "v1" }, { "lit": "workflows" }, { "var": "workflow_id" }, { "lit": "mailing-list" }], "t": { "req": { "dryRun": "`reqdata.dry_run`", "expectedRevisionId": "`reqdata.expected_revision_id`", "mailingListId": "`reqdata.mailing_list_id`", "queuedContactPolicy": "`reqdata.queued_contact_policy`" }, "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.workflow"]] }, "key$": "change_workflow_mailing_list", "name__orig": "change_workflow_mailing_list", "Name": "ChangeWorkflowMailingList", "name_": "change_workflow_mailing_list", "name-": "change-workflow-mailing-list", "NAME": "CHANGE_WORKFLOW_MAILING_LIST", "index$": 3 }, { "active": true, "entity": "change_workflow_mailing_list", "key$": "BasicChangeWorkflowMailingListFlow", "kind": "basic", "name": "BasicChangeWorkflowMailingListFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "change_workflow_mailing_list_ref01" }, "m": { "workflow_id": "workflow01" }, "o": "create", "s": [], "v": [] }] }, 'ChangeWorkflowMailingList', { "POST /v1/workflows/{workflowId}/mailing-list": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "expectedRevisionId": { "type": ["string", "null"], "description": "The workflow revision token returned by the latest workflow read or mutation. Older workflows may return `null` before their first revision-aware mutation; pass `null` back as `expectedRevisionId` in that case. If the token is stale, the API returns a `409 Conflict` error.", "x-ref": "#/components/schemas/WorkflowExpectedRevisionId", "key$": "expectedRevisionId" }, "mailingListId": { "type": ["string", "null"], "description": "The mailing list to use for the workflow. When assigning a mailing list, queued contacts excluded by the new list can return `queuedContactsFound`; retry with `queuedContactPolicy: \"discard\"` to apply the change and discard those contacts. Use `null` to clear the workflow mailing list; clearing does not discard queued contacts.", "key$": "mailingListId" }, "dryRun": { "type": "boolean", "description": "If `true`, the request will be validated but the workflow will not be modified.", "key$": "dryRun" }, "queuedContactPolicy": { "type": "string", "enum": ["fail", "discard"], "default": "fail", "description": "`fail` returns queued-contact impact instead of mutating. `discard` confirms that matching queued contacts should be discarded. Defaults to `fail` when omitted.", "x-ref": "#/components/schemas/WorkflowQueuedContactPolicy", "key$": "queuedContactPolicy" } }, "required": ["expectedRevisionId", "mailingListId"], "additionalProperties": false, "x-ref": "#/components/schemas/ChangeWorkflowMailingListRequest", "index$": 1 } } } }, "parameters": [{ "name": "workflowId", "in": "path", "required": true, "description": "The ID of the workflow.", "schema": { "type": "string" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const change_workflow_mailing_list_ref01_ent = client.ChangeWorkflowMailingList();
        let change_workflow_mailing_list_ref01_data = setup.data.new.change_workflow_mailing_list['change_workflow_mailing_list_ref01'];
        change_workflow_mailing_list_ref01_data['workflow_id'] = setup.idmap['workflow01'];
        change_workflow_mailing_list_ref01_data = (await change_workflow_mailing_list_ref01_ent.create(change_workflow_mailing_list_ref01_data)).data();
        (0, node_assert_1.default)(null != change_workflow_mailing_list_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/change_workflow_mailing_list/ChangeWorkflowMailingListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LoopsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['change_workflow_mailing_list01', 'change_workflow_mailing_list02', 'change_workflow_mailing_list03', 'workflow01', 'workflow02', 'workflow03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOOPS_TEST_CHANGE_WORKFLOW_MAILING_LIST_ENTID': idmap,
        'LOOPS_TEST_LIVE': 'FALSE',
        'LOOPS_TEST_EXPLAIN': 'FALSE',
        'LOOPS_APIKEY': '',
    });
    idmap = env['LOOPS_TEST_CHANGE_WORKFLOW_MAILING_LIST_ENTID'];
    const live = 'TRUE' === env.LOOPS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOOPS_TEST_CHANGE_WORKFLOW_MAILING_LIST_ENTID'];
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
//# sourceMappingURL=ChangeWorkflowMailingListEntity.test.js.map