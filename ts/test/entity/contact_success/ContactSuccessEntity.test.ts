

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LoopsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ContactSuccessEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.ContactSuccess()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create', 'update']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'contact_success.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":true,"t":"`$STRING`","key$":"id","index$":0},"success":{"a":true,"h":"Success","n":"success","r":true,"t":"`$BOOLEAN`","key$":"success","index$":1}},"id":{"field":"id","name":"id"},"name":"contact_success","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/contacts/create","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/contacts/create","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"contacts"},{"lit":"create"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /v1/contacts/update","source":"openapi3","version":2},"g":{},"k":"http","m":"PUT","o":"/v1/contacts/update","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"contacts"},{"lit":"update"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"contact_success","name__orig":"contact_success","Name":"ContactSuccess","name_":"contact_success","name-":"contact-success","NAME":"CONTACT_SUCCESS","index$":11}, {"active":true,"entity":"contact_success","key$":"BasicContactSuccessFlow","kind":"basic","name":"BasicContactSuccessFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"contact_success_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{"ref":"contact_success_ref01","srcdatavar":"contact_success_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-contact_success_ref01"}}],"v":[]}]}, 'ContactSuccess', {"POST /v1/contacts/create":{"protocol":"http","requestBody":{"description":"You can add custom contact properties as keys in this request (of type `string`, `number`, `boolean` or `date`. [See available date formats](https://loops.so/docs/contacts/properties#dates)). Make sure to create the properties in Loops before using them in API calls.","content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"email":{"type":"string","examples":["alex@company.com"],"description":"The contact's email address."},"firstName":{"type":"string","description":"The contact's first name.","examples":["Alex"]},"lastName":{"type":"string","description":"The contact's last name.","examples":["Rivera"]},"source":{"type":"string","description":"A custom source value to replace the default “API”.","examples":["API"]},"subscribed":{"type":"boolean","description":"Whether the contact will receive campaign and workflow emails. All new contacts are subscribed by default."},"userGroup":{"type":"string","description":"The contact's user group.","examples":["customers"]},"userId":{"type":"string","description":"A unique user ID (for example, from an external application).","examples":["usr_7f8e9d0c1b2a"]},"mailingLists":{"type":"object","description":"Manage mailing list subscriptions.\n\nInclude key-value pairs of mailing list IDs and a `boolean` denoting if the contact should be added (`true`) or removed (`false`) from the list.","examples":[{}],"x-ref":"#/components/schemas/MailingListSubscriptions"}},"additionalProperties":{"oneOf":[{"type":"string"},{"type":"number"},{"type":"boolean"}]},"examples":[{"email":"alex@company.com","firstName":"Alex","lastName":"Rivera","subscribed":true,"userGroup":"customers","userId":"usr_7f8e9d0c1b2a","mailingLists":{"clm2k8j4h6g0f8d6s4a2b0z8":true},"favoriteColor":"blue"}],"x-ref":"#/components/schemas/ContactFields"},{"type":"object","required":["email"]}],"x-ref":"#/components/schemas/ContactRequest","index$":1}}},"required":true},"parameters":[]},"PUT /v1/contacts/update":{"protocol":"http","requestBody":{"description":"You can add custom contact properties as keys in this request (of type `string`, `number`, `boolean` or `date`. [See available date formats](https://loops.so/docs/contacts/properties#dates)). Make sure to create the properties in Loops before using them in API calls.","content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"email":{"type":"string","examples":["alex@company.com"],"description":"The contact's email address."},"firstName":{"type":"string","description":"The contact's first name.","examples":["Alex"]},"lastName":{"type":"string","description":"The contact's last name.","examples":["Rivera"]},"source":{"type":"string","description":"A custom source value to replace the default “API”.","examples":["API"]},"subscribed":{"type":"boolean","description":"Whether the contact will receive campaign and workflow emails. All new contacts are subscribed by default."},"userGroup":{"type":"string","description":"The contact's user group.","examples":["customers"]},"userId":{"type":"string","description":"A unique user ID (for example, from an external application).","examples":["usr_7f8e9d0c1b2a"]},"mailingLists":{"type":"object","description":"Manage mailing list subscriptions.\n\nInclude key-value pairs of mailing list IDs and a `boolean` denoting if the contact should be added (`true`) or removed (`false`) from the list.","examples":[{}],"x-ref":"#/components/schemas/MailingListSubscriptions"}},"additionalProperties":{"oneOf":[{"type":"string"},{"type":"number"},{"type":"boolean"}]},"examples":[{"email":"alex@company.com","firstName":"Alex","lastName":"Rivera","subscribed":true,"userGroup":"customers","userId":"usr_7f8e9d0c1b2a","mailingLists":{"clm2k8j4h6g0f8d6s4a2b0z8":true},"favoriteColor":"blue"}],"x-ref":"#/components/schemas/ContactFields"},{"type":"object","properties":{"email":{"type":"string","description":"The contact's email address. **Required if `userId` is not provided.**"},"subscribed":{"type":"boolean","description":"Whether the contact will receive campaign and workflow emails. We recommend leaving this field out of your update requests unless you specifically want to unsubscribe (`false`) or re-subscribe (`true`) a contact. All new contacts are subscribed by default."},"userId":{"type":"string","description":"The contact's unique user ID. **Required if `email` is not provided.**"}},"anyOf":[{"required":["email"]},{"required":["userId"]}]}],"additionalProperties":{"oneOf":[{"type":"string"},{"type":"number"},{"type":"boolean"}]},"examples":[{"email":"alex@company.com","firstName":"Alex","lastName":"Rivera","subscribed":true,"userGroup":"customers","userId":"usr_7f8e9d0c1b2a","mailingLists":{"clm2k8j4h6g0f8d6s4a2b0z8":true},"favoriteColor":"blue"}],"x-ref":"#/components/schemas/ContactUpdateRequest","index$":1}}},"required":true},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const contact_success_ref01_ent = client.ContactSuccess()
    let contact_success_ref01_data = setup.data.new.contact_success['contact_success_ref01']

    contact_success_ref01_data = (await contact_success_ref01_ent.create(contact_success_ref01_data)).data()
    assert(null != contact_success_ref01_data.id)


    // UPDATE
    const contact_success_ref01_data_up0: any = {}
    contact_success_ref01_data_up0.id = contact_success_ref01_data.id

    const contact_success_ref01_resdata_up0 = (await contact_success_ref01_ent.update(contact_success_ref01_data_up0)).data()
    assert(contact_success_ref01_resdata_up0.id === contact_success_ref01_data_up0.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/contact_success/ContactSuccessTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LoopsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['contact_success01','contact_success02','contact_success03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_CONTACT_SUCCESS_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_CONTACT_SUCCESS_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_CONTACT_SUCCESS_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LoopsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
