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
(0, node_test_1.describe)('AudienceSegmentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LOOPS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LoopsSDK.test();
        const ent = testsdk.AudienceSegment();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LOOPS_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'audience_segment.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdAt": { "a": true, "h": "Created At", "n": "createdAt", "r": true, "sh": "ISO 8601 timestamp for when the audience segment was created.", "t": "`$STRING`", "key$": "createdAt", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "An optional description of the audience segment.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "description", "index$": 1 }, "filter": { "a": true, "h": "Filter", "n": "filter", "r": true, "sh": "A tree of audience conditions combined with `match`.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "union": { "branches": 3, "count": 1, "depth": 7 }, "key$": "filter", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "The ID of the audience segment.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "The name of the audience segment.", "t": "`$STRING`", "key$": "name", "index$": 4 }, "updatedAt": { "a": true, "h": "Updated At", "n": "updatedAt", "r": true, "sh": "ISO 8601 timestamp for when the audience segment was last updated.", "t": "`$STRING`", "key$": "updatedAt", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "audience_segment", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/audience-segments", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/v1/audience-segments", "q": {}, "r": {}, "s": [{ "lit": "v1" }, { "lit": "audience-segments" }], "t": { "req": { "description": "`reqdata.description`", "filter": "`reqdata.filter`", "name": "`reqdata.name`" }, "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/audience-segments", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "per_page", "or": "perPage", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/audience-segments", "q": { "exist": ["cursor", "per_page"] }, "r": {}, "s": [{ "lit": "v1" }, { "lit": "audience-segments" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/audience-segments/{audienceSegmentId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "audienceSegmentId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/audience-segments/{audienceSegmentId}", "q": { "exist": ["id"] }, "r": { "param": { "audienceSegmentId": "id" } }, "s": [{ "lit": "v1" }, { "lit": "audience-segments" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "audience_segment", "name__orig": "audience_segment", "Name": "AudienceSegment", "name_": "audience_segment", "name-": "audience-segment", "NAME": "AUDIENCE_SEGMENT", "index$": 1 }, { "active": true, "entity": "audience_segment", "key$": "BasicAudienceSegmentFlow", "kind": "basic", "name": "BasicAudienceSegmentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "audience_segment_ref01" }, "m": {}, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "audience_segment_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "audience_segment_ref01", "srcdatavar": "audience_segment_ref01_data", "suffix": "_dt0" }, "m": { "id": "audience_segment01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-audience_segment_ref01" } }] }] }, 'AudienceSegment', { "POST /v1/audience-segments": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "maxLength": 255, "description": "The name of the audience segment. Must be unique within the team.", "examples": ["Active users"], "key$": "name" }, "description": { "type": "string", "maxLength": 1000, "description": "An optional description of the audience segment.", "key$": "description" }, "filter": { "type": "object", "description": "A tree of audience conditions combined with `match`.", "properties": { "match": { "type": "string", "enum": ["all", "any"] }, "conditions": { "type": "array", "minItems": 1, "items": { "oneOf": [], "discriminator": {}, "x-ref": "#/components/schemas/AudienceFilterCondition" } } }, "required": ["match", "conditions"], "additionalProperties": false, "key$": "filter" } }, "required": ["name", "filter"], "additionalProperties": false, "x-ref": "#/components/schemas/CreateAudienceSegmentRequest", "index$": 1 } } } }, "parameters": [] }, "GET /v1/audience-segments": { "protocol": "http", "parameters": [{ "name": "perPage", "in": "query", "required": false, "description": "How many results to return in each request. Must be between 10 and 50. Default is 20.", "schema": { "type": "string" }, "index$": 0 }, { "name": "cursor", "in": "query", "required": false, "description": "A cursor to return a specific page of results. Cursors can be found from the `pagination.nextCursor` value in each response.", "schema": { "type": "string" }, "index$": 1 }] }, "GET /v1/audience-segments/{audienceSegmentId}": { "protocol": "http", "parameters": [{ "name": "audienceSegmentId", "in": "path", "required": true, "description": "The ID of the audience segment.", "schema": { "type": "string", "examples": ["cls6e8g0i2k4m6o8q0s2u4w6"] }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const audience_segment_ref01_ent = client.AudienceSegment();
        let audience_segment_ref01_data = setup.data.new.audience_segment['audience_segment_ref01'];
        audience_segment_ref01_data = (await audience_segment_ref01_ent.create(audience_segment_ref01_data)).data();
        (0, node_assert_1.default)(null != audience_segment_ref01_data.id);
        // LIST
        const audience_segment_ref01_match = {};
        const audience_segment_ref01_list = (await audience_segment_ref01_ent.list(audience_segment_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(audience_segment_ref01_list, { id: audience_segment_ref01_data.id })));
        // LOAD
        const audience_segment_ref01_match_dt0 = {};
        audience_segment_ref01_match_dt0.id = audience_segment_ref01_data.id;
        const audience_segment_ref01_data_dt0 = (await audience_segment_ref01_ent.load(audience_segment_ref01_match_dt0)).data();
        (0, node_assert_1.default)(audience_segment_ref01_data_dt0.id === audience_segment_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/audience_segment/AudienceSegmentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LoopsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['audience_segment01', 'audience_segment02', 'audience_segment03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LOOPS_TEST_AUDIENCE_SEGMENT_ENTID': idmap,
        'LOOPS_TEST_LIVE': 'FALSE',
        'LOOPS_TEST_EXPLAIN': 'FALSE',
        'LOOPS_APIKEY': '',
    });
    idmap = env['LOOPS_TEST_AUDIENCE_SEGMENT_ENTID'];
    const live = 'TRUE' === env.LOOPS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LOOPS_TEST_AUDIENCE_SEGMENT_ENTID'];
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
//# sourceMappingURL=AudienceSegmentEntity.test.js.map