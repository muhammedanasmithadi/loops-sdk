

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


describe('ContactPropertyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.ContactProperty()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'contact_property.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"key":{"a":true,"h":"Key","n":"key","r":true,"sh":"The key of the contact property.","t":"`$STRING`","key$":"key","index$":0},"label":{"a":true,"h":"Label","n":"label","r":true,"sh":"The human-friendly label for this property.","t":"`$STRING`","key$":"label","index$":1},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"The type of property.","t":"`$STRING`","key$":"type","index$":2}},"name":"contact_property","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/contacts/properties","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"list","or":"list","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/contacts/properties","q":{"exist":["list"]},"r":{},"s":[{"lit":"v1"},{"lit":"contacts"},{"lit":"properties"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"contact_property","name__orig":"contact_property","Name":"ContactProperty","name_":"contact_property","name-":"contact-property","NAME":"CONTACT_PROPERTY","index$":9}, {"active":true,"entity":"contact_property","key$":"BasicContactPropertyFlow","kind":"basic","name":"BasicContactPropertyFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"contact_property_ref01"}}]}]}, 'ContactProperty', {"GET /v1/contacts/properties":{"protocol":"http","parameters":[{"name":"list","in":"query","required":false,"description":"`all` (default) or `custom` (only custom contact properties)","schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let contact_property_ref01_data = Object.values(setup.data.existing.contact_property)[0] as any

    // LIST
    const contact_property_ref01_ent = client.ContactProperty()
    const contact_property_ref01_match: any = {}

    const contact_property_ref01_list = (await contact_property_ref01_ent.list(contact_property_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/contact_property/ContactPropertyTestData.json')

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
    ['contact_property01','contact_property02','contact_property03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_CONTACT_PROPERTY_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_CONTACT_PROPERTY_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_CONTACT_PROPERTY_ENTID']
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
  
