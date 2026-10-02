

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


describe('MailingListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.MailingList()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'mailing_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":true,"sh":"The description of the mailing list.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"description","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the mailing list.","t":"`$STRING`","key$":"id","index$":1},"isPublic":{"a":true,"h":"Is Public","n":"isPublic","r":true,"sh":"Whether the mailing list is public (`true`) or private (`false`).","t":"`$BOOLEAN`","key$":"isPublic","index$":2},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the mailing list.","t":"`$STRING`","key$":"name","index$":3}},"id":{"field":"id","name":"id"},"name":"mailing_list","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/lists","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/lists","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"lists"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"mailing_list","name__orig":"mailing_list","Name":"MailingList","name_":"mailing_list","name-":"mailing-list","NAME":"MAILING_LIST","index$":23}, {"active":true,"entity":"mailing_list","key$":"BasicMailingListFlow","kind":"basic","name":"BasicMailingListFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"mailing_list_ref01"}}]}]}, 'MailingList', {"GET /v1/lists":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let mailing_list_ref01_data = Object.values(setup.data.existing.mailing_list)[0] as any

    // LIST
    const mailing_list_ref01_ent = client.MailingList()
    const mailing_list_ref01_match: any = {}

    const mailing_list_ref01_list = (await mailing_list_ref01_ent.list(mailing_list_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/mailing_list/MailingListTestData.json')

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
    ['mailing_list01','mailing_list02','mailing_list03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_MAILING_LIST_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_MAILING_LIST_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_MAILING_LIST_ENTID']
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
  
