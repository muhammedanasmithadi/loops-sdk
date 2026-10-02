"use strict";
// Loops Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.LoopsSDK = exports.LoopsEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const ApiKeyEntity_1 = require("./entity/ApiKeyEntity");
const AudienceSegmentEntity_1 = require("./entity/AudienceSegmentEntity");
const CampaignEntity_1 = require("./entity/CampaignEntity");
const ChangeWorkflowMailingListEntity_1 = require("./entity/ChangeWorkflowMailingListEntity");
const CompleteEntity_1 = require("./entity/CompleteEntity");
const ComponentEntity_1 = require("./entity/ComponentEntity");
const ConfigurationEntity_1 = require("./entity/ConfigurationEntity");
const ContactEntity_1 = require("./entity/ContactEntity");
const ContactDeleteEntity_1 = require("./entity/ContactDeleteEntity");
const ContactPropertyEntity_1 = require("./entity/ContactPropertyEntity");
const ContactPropertySuccessEntity_1 = require("./entity/ContactPropertySuccessEntity");
const ContactSuccessEntity_1 = require("./entity/ContactSuccessEntity");
const ContactSuppressionRemoveEntity_1 = require("./entity/ContactSuppressionRemoveEntity");
const ContactSuppressionStatusEntity_1 = require("./entity/ContactSuppressionStatusEntity");
const CreateUploadEntity_1 = require("./entity/CreateUploadEntity");
const CreateWorkflowNodeEntity_1 = require("./entity/CreateWorkflowNodeEntity");
const EmailMessageEntity_1 = require("./entity/EmailMessageEntity");
const EmailMessageGuardianEntity_1 = require("./entity/EmailMessageGuardianEntity");
const EmailMessagePreviewEntity_1 = require("./entity/EmailMessagePreviewEntity");
const EmailMetricEntity_1 = require("./entity/EmailMetricEntity");
const EventPatternEntity_1 = require("./entity/EventPatternEntity");
const EventSuccessEntity_1 = require("./entity/EventSuccessEntity");
const GroupEntity_1 = require("./entity/GroupEntity");
const MailingListEntity_1 = require("./entity/MailingListEntity");
const SimplifiedWorkflowEntity_1 = require("./entity/SimplifiedWorkflowEntity");
const ThemeEntity_1 = require("./entity/ThemeEntity");
const TransactionalEntity_1 = require("./entity/TransactionalEntity");
const TransactionalDraftEntity_1 = require("./entity/TransactionalDraftEntity");
const TransactionalMetricEntity_1 = require("./entity/TransactionalMetricEntity");
const TransactionalResourceEntity_1 = require("./entity/TransactionalResourceEntity");
const UpdateComponentEntity_1 = require("./entity/UpdateComponentEntity");
const UpdateThemeEntity_1 = require("./entity/UpdateThemeEntity");
const UpdateWorkflowNodeEntity_1 = require("./entity/UpdateWorkflowNodeEntity");
const WorkflowEntity_1 = require("./entity/WorkflowEntity");
const WorkflowNodeEntity_1 = require("./entity/WorkflowNodeEntity");
const WorkflowNodeWithRevisionEntity_1 = require("./entity/WorkflowNodeWithRevisionEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const LoopsEntityBase_1 = require("./LoopsEntityBase");
Object.defineProperty(exports, "LoopsEntityBase", { enumerable: true, get: function () { return LoopsEntityBase_1.LoopsEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class LoopsSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('LoopsSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, fetched) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, err) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('LoopsSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('LoopsSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.ApiKey().list()` / `client.ApiKey().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ApiKey(entopts) {
        const self = this;
        return new ApiKeyEntity_1.ApiKeyEntity(self, entopts);
    }
    // Entity access: `client.AudienceSegment().list()` / `client.AudienceSegment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AudienceSegment(entopts) {
        const self = this;
        return new AudienceSegmentEntity_1.AudienceSegmentEntity(self, entopts);
    }
    // Entity access: `client.Campaign().list()` / `client.Campaign().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Campaign(entopts) {
        const self = this;
        return new CampaignEntity_1.CampaignEntity(self, entopts);
    }
    // Entity access: `client.ChangeWorkflowMailingList().list()` / `client.ChangeWorkflowMailingList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ChangeWorkflowMailingList(entopts) {
        const self = this;
        return new ChangeWorkflowMailingListEntity_1.ChangeWorkflowMailingListEntity(self, entopts);
    }
    // Entity access: `client.Complete().list()` / `client.Complete().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Complete(entopts) {
        const self = this;
        return new CompleteEntity_1.CompleteEntity(self, entopts);
    }
    // Entity access: `client.Component().list()` / `client.Component().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Component(entopts) {
        const self = this;
        return new ComponentEntity_1.ComponentEntity(self, entopts);
    }
    // Entity access: `client.Configuration().list()` / `client.Configuration().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Configuration(entopts) {
        const self = this;
        return new ConfigurationEntity_1.ConfigurationEntity(self, entopts);
    }
    // Entity access: `client.Contact().list()` / `client.Contact().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Contact(entopts) {
        const self = this;
        return new ContactEntity_1.ContactEntity(self, entopts);
    }
    // Entity access: `client.ContactDelete().list()` / `client.ContactDelete().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ContactDelete(entopts) {
        const self = this;
        return new ContactDeleteEntity_1.ContactDeleteEntity(self, entopts);
    }
    // Entity access: `client.ContactProperty().list()` / `client.ContactProperty().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ContactProperty(entopts) {
        const self = this;
        return new ContactPropertyEntity_1.ContactPropertyEntity(self, entopts);
    }
    // Entity access: `client.ContactPropertySuccess().list()` / `client.ContactPropertySuccess().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ContactPropertySuccess(entopts) {
        const self = this;
        return new ContactPropertySuccessEntity_1.ContactPropertySuccessEntity(self, entopts);
    }
    // Entity access: `client.ContactSuccess().list()` / `client.ContactSuccess().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ContactSuccess(entopts) {
        const self = this;
        return new ContactSuccessEntity_1.ContactSuccessEntity(self, entopts);
    }
    // Entity access: `client.ContactSuppressionRemove().list()` / `client.ContactSuppressionRemove().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ContactSuppressionRemove(entopts) {
        const self = this;
        return new ContactSuppressionRemoveEntity_1.ContactSuppressionRemoveEntity(self, entopts);
    }
    // Entity access: `client.ContactSuppressionStatus().list()` / `client.ContactSuppressionStatus().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ContactSuppressionStatus(entopts) {
        const self = this;
        return new ContactSuppressionStatusEntity_1.ContactSuppressionStatusEntity(self, entopts);
    }
    // Entity access: `client.CreateUpload().list()` / `client.CreateUpload().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CreateUpload(entopts) {
        const self = this;
        return new CreateUploadEntity_1.CreateUploadEntity(self, entopts);
    }
    // Entity access: `client.CreateWorkflowNode().list()` / `client.CreateWorkflowNode().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CreateWorkflowNode(entopts) {
        const self = this;
        return new CreateWorkflowNodeEntity_1.CreateWorkflowNodeEntity(self, entopts);
    }
    // Entity access: `client.EmailMessage().list()` / `client.EmailMessage().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EmailMessage(entopts) {
        const self = this;
        return new EmailMessageEntity_1.EmailMessageEntity(self, entopts);
    }
    // Entity access: `client.EmailMessageGuardian().list()` / `client.EmailMessageGuardian().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EmailMessageGuardian(entopts) {
        const self = this;
        return new EmailMessageGuardianEntity_1.EmailMessageGuardianEntity(self, entopts);
    }
    // Entity access: `client.EmailMessagePreview().list()` / `client.EmailMessagePreview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EmailMessagePreview(entopts) {
        const self = this;
        return new EmailMessagePreviewEntity_1.EmailMessagePreviewEntity(self, entopts);
    }
    // Entity access: `client.EmailMetric().list()` / `client.EmailMetric().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EmailMetric(entopts) {
        const self = this;
        return new EmailMetricEntity_1.EmailMetricEntity(self, entopts);
    }
    // Entity access: `client.EventPattern().list()` / `client.EventPattern().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EventPattern(entopts) {
        const self = this;
        return new EventPatternEntity_1.EventPatternEntity(self, entopts);
    }
    // Entity access: `client.EventSuccess().list()` / `client.EventSuccess().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    EventSuccess(entopts) {
        const self = this;
        return new EventSuccessEntity_1.EventSuccessEntity(self, entopts);
    }
    // Entity access: `client.Group().list()` / `client.Group().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Group(entopts) {
        const self = this;
        return new GroupEntity_1.GroupEntity(self, entopts);
    }
    // Entity access: `client.MailingList().list()` / `client.MailingList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MailingList(entopts) {
        const self = this;
        return new MailingListEntity_1.MailingListEntity(self, entopts);
    }
    // Entity access: `client.SimplifiedWorkflow().list()` / `client.SimplifiedWorkflow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SimplifiedWorkflow(entopts) {
        const self = this;
        return new SimplifiedWorkflowEntity_1.SimplifiedWorkflowEntity(self, entopts);
    }
    // Entity access: `client.Theme().list()` / `client.Theme().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Theme(entopts) {
        const self = this;
        return new ThemeEntity_1.ThemeEntity(self, entopts);
    }
    // Entity access: `client.Transactional().list()` / `client.Transactional().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Transactional(entopts) {
        const self = this;
        return new TransactionalEntity_1.TransactionalEntity(self, entopts);
    }
    // Entity access: `client.TransactionalDraft().list()` / `client.TransactionalDraft().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TransactionalDraft(entopts) {
        const self = this;
        return new TransactionalDraftEntity_1.TransactionalDraftEntity(self, entopts);
    }
    // Entity access: `client.TransactionalMetric().list()` / `client.TransactionalMetric().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TransactionalMetric(entopts) {
        const self = this;
        return new TransactionalMetricEntity_1.TransactionalMetricEntity(self, entopts);
    }
    // Entity access: `client.TransactionalResource().list()` / `client.TransactionalResource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TransactionalResource(entopts) {
        const self = this;
        return new TransactionalResourceEntity_1.TransactionalResourceEntity(self, entopts);
    }
    // Entity access: `client.UpdateComponent().list()` / `client.UpdateComponent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UpdateComponent(entopts) {
        const self = this;
        return new UpdateComponentEntity_1.UpdateComponentEntity(self, entopts);
    }
    // Entity access: `client.UpdateTheme().list()` / `client.UpdateTheme().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UpdateTheme(entopts) {
        const self = this;
        return new UpdateThemeEntity_1.UpdateThemeEntity(self, entopts);
    }
    // Entity access: `client.UpdateWorkflowNode().list()` / `client.UpdateWorkflowNode().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UpdateWorkflowNode(entopts) {
        const self = this;
        return new UpdateWorkflowNodeEntity_1.UpdateWorkflowNodeEntity(self, entopts);
    }
    // Entity access: `client.Workflow().list()` / `client.Workflow().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Workflow(entopts) {
        const self = this;
        return new WorkflowEntity_1.WorkflowEntity(self, entopts);
    }
    // Entity access: `client.WorkflowNode().list()` / `client.WorkflowNode().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkflowNode(entopts) {
        const self = this;
        return new WorkflowNodeEntity_1.WorkflowNodeEntity(self, entopts);
    }
    // Entity access: `client.WorkflowNodeWithRevision().list()` / `client.WorkflowNodeWithRevision().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WorkflowNodeWithRevision(entopts) {
        const self = this;
        return new WorkflowNodeWithRevisionEntity_1.WorkflowNodeWithRevisionEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new LoopsSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return LoopsSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Loops' };
    }
    toString() {
        return 'Loops ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.LoopsSDK = LoopsSDK;
const SDK = LoopsSDK;
exports.SDK = SDK;
//# sourceMappingURL=LoopsSDK.js.map