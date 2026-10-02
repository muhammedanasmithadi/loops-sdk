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
(0, node_test_1.describe)('EmailMetricEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOOPS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LoopsSDK.test();
        const ent = testsdk.EmailMetric();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOOPS_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'email_metric.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "clicks": { "a": true, "h": "Clicks", "n": "clicks", "r": true, "sh": "Number of sends where at least one link was clicked.", "t": "`$INTEGER`", "key$": "clicks", "index$": 0 }, "hardBounces": { "a": true, "h": "Hard Bounces", "n": "hardBounces", "r": true, "sh": "Number of sends that hard bounced.", "t": "`$INTEGER`", "key$": "hardBounces", "index$": 1 }, "opens": { "a": true, "h": "Opens", "n": "opens", "r": true, "sh": "Number of sends that were opened at least once.", "t": "`$INTEGER`", "key$": "opens", "index$": 2 }, "sends": { "a": true, "h": "Sends", "n": "sends", "r": true, "sh": "Number of sends.", "t": "`$INTEGER`", "key$": "sends", "index$": 3 }, "softBounces": { "a": true, "h": "Soft Bounces", "n": "softBounces", "r": true, "sh": "Number of sends that soft bounced.", "t": "`$INTEGER`", "key$": "softBounces", "index$": 4 }, "spamReports": { "a": true, "h": "Spam Reports", "n": "spamReports", "r": true, "sh": "Number of sends reported as spam.", "t": "`$INTEGER`", "key$": "spamReports", "index$": 5 }, "unsubscribes": { "a": true, "h": "Unsubscribes", "n": "unsubscribes", "r": true, "sh": "Number of unsubscribes.", "t": "`$INTEGER`", "key$": "unsubscribes", "index$": 6 } }, "name": "email_metric", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/workflows/{workflowId}/nodes/{nodeId}/metrics", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "node_id", "or": "nodeId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "workflow_id", "or": "workflowId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/workflows/{workflowId}/nodes/{nodeId}/metrics", "q": { "exist": ["node_id", "workflow_id"] }, "r": { "param": { "nodeId": "node_id", "workflowId": "workflow_id" } }, "s": [{ "lit": "v1" }, { "lit": "workflows" }, { "var": "workflow_id" }, { "lit": "nodes" }, { "var": "node_id" }, { "lit": "metrics" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/campaigns/{campaignId}/metrics", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "campaign_id", "or": "campaignId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/campaigns/{campaignId}/metrics", "q": { "exist": ["campaign_id"] }, "r": { "param": { "campaignId": "campaign_id" } }, "s": [{ "lit": "v1" }, { "lit": "campaigns" }, { "var": "campaign_id" }, { "lit": "metrics" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.campaign"], ["$.main.kit.entity.workflow"]] }, "key$": "email_metric", "name__orig": "email_metric", "Name": "EmailMetric", "name_": "email_metric", "name-": "email-metric", "NAME": "EMAIL_METRIC", "index$": 19 }, { "active": true, "entity": "email_metric", "key$": "BasicEmailMetricFlow", "kind": "basic", "name": "BasicEmailMetricFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "email_metric_ref01", "srcdatavar": "email_metric_ref01_data", "suffix": "_dt0" }, "m": { "id": "email_metric01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-email_metric_ref01" } }] }] }, 'EmailMetric', { "GET /v1/workflows/{workflowId}/nodes/{nodeId}/metrics": { "protocol": "http", "parameters": [{ "name": "workflowId", "in": "path", "required": true, "description": "The ID of the workflow.", "schema": { "type": "string", "examples": ["clw1a3b5c7d9e1f3g5h7i9j1"] }, "index$": 0 }, { "name": "nodeId", "in": "path", "required": true, "description": "The ID of the `SendEmailAction` node.", "schema": { "type": "string", "examples": ["cln1a3b5c7d9e1f3g5h7i9j1"] }, "index$": 1 }] }, "GET /v1/campaigns/{campaignId}/metrics": { "protocol": "http", "parameters": [{ "name": "campaignId", "in": "path", "required": true, "description": "The ID of the campaign.", "schema": { "type": "string", "examples": ["clc4m6n8p0q2r4s6t8u0v2x4"] }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let email_metric_ref01_data = Object.values(setup.data.existing.email_metric)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const email_metric_ref01_ent = client.EmailMetric();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/email_metric/EmailMetricTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LoopsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['email_metric01', 'email_metric02', 'email_metric03', 'campaign01', 'campaign02', 'campaign03', 'workflow01', 'workflow02', 'workflow03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOOPS_TEST_EMAIL_METRIC_ENTID': idmap,
        'LOOPS_TEST_LIVE': 'FALSE',
        'LOOPS_TEST_EXPLAIN': 'FALSE',
        'LOOPS_APIKEY': '',
    });
    idmap = env['LOOPS_TEST_EMAIL_METRIC_ENTID'];
    const live = 'TRUE' === env.LOOPS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOOPS_TEST_EMAIL_METRIC_ENTID'];
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
//# sourceMappingURL=EmailMetricEntity.test.js.map