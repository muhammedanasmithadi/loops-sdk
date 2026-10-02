

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


describe('TransactionalResourceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.TransactionalResource()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'transactional_resource.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":true,"sh":"ISO 8601 timestamp for when the transactional email was created.","t":"`$STRING`","key$":"createdAt","index$":0},"dataVariables":{"a":true,"h":"Data Variables","n":"dataVariables","r":true,"sh":"Data variable names used by the published email.","t":"`$ARRAY`","key$":"dataVariables","index$":1},"draftEmailMessageId":{"a":true,"h":"Draft Email Message Id","n":"draftEmailMessageId","r":true,"sh":"The ID of the draft email message.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"draftEmailMessageId","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"The ID of the transactional email.","t":"`$STRING`","key$":"id","index$":3},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The name of the transactional email.","t":"`$STRING`","key$":"name","index$":4},"publishedEmailMessageId":{"a":true,"h":"Published Email Message Id","n":"publishedEmailMessageId","r":true,"sh":"The ID of the published email message.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"publishedEmailMessageId","index$":5},"transactionalGroupId":{"a":true,"h":"Transactional Group Id","n":"transactionalGroupId","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The ID of the group this transactional email belongs to.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"transactionalGroupId","index$":6},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":true,"sh":"ISO 8601 timestamp for when the transactional email was last updated.","t":"`$STRING`","key$":"updatedAt","index$":7},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"The URL of the transactional email in the Loops app.","t":"`$STRING`","key$":"url","index$":8}},"id":{"field":"id","name":"id"},"name":"transactional_resource","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/transactional-emails/{transactionalId}/publish","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"transactional_email_id","or":"transactionalId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/transactional-emails/{transactionalId}/publish","q":{"exist":["transactional_email_id"]},"r":{"param":{"transactionalId":"transactional_email_id"}},"s":[{"lit":"v1"},{"lit":"transactional-emails"},{"var":"transactional_email_id"},{"lit":"publish"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /v1/transactional-emails/{transactionalId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"transactional_id","or":"transactionalId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/transactional-emails/{transactionalId}","q":{"exist":["transactional_id"]},"r":{"param":{"transactionalId":"transactional_id"}},"s":[{"lit":"v1"},{"lit":"transactional-emails"},{"var":"transactional_id"}],"t":{"req":{"name":"`reqdata.name`","transactionalGroupId":"`reqdata.transactional_group_id`"},"res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /v1/transactional-emails","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/v1/transactional-emails","q":{},"r":{},"s":[{"lit":"v1"},{"lit":"transactional-emails"}],"t":{"req":{"name":"`reqdata.name`","transactionalGroupId":"`reqdata.transactional_group_id`"},"res":"`body`"},"index$":2}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/transactional-emails","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"per_page","or":"perPage","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/transactional-emails","q":{"exist":["cursor","per_page"]},"r":{},"s":[{"lit":"v1"},{"lit":"transactional-emails"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/transactional-emails/{transactionalId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"transactional_id","or":"transactionalId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/transactional-emails/{transactionalId}","q":{"exist":["transactional_id"]},"r":{"param":{"transactionalId":"transactional_id"}},"s":[{"lit":"v1"},{"lit":"transactional-emails"},{"var":"transactional_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"transactional_resource","name__orig":"transactional_resource","Name":"TransactionalResource","name_":"transactional_resource","name-":"transactional-resource","NAME":"TRANSACTIONAL_RESOURCE","index$":29}, {"active":true,"entity":"transactional_resource","key$":"BasicTransactionalResourceFlow","kind":"basic","name":"BasicTransactionalResourceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"transactional_resource_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"transactional_resource_ref01"}}]},{"a":true,"d":{},"i":{"ref":"transactional_resource_ref01","srcdatavar":"transactional_resource_ref01_data","suffix":"_dt0"},"m":{"id":"transactional_resource01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-transactional_resource_ref01"}}]}]}, 'TransactionalResource', {"POST /v1/transactional-emails/{transactionalId}/publish":{"protocol":"http","parameters":[{"name":"transactionalId","in":"path","required":true,"description":"The ID of the transactional email.","schema":{"type":"string","examples":["cll42l54f20i1la0lfooe3z12"]},"index$":0}]},"POST /v1/transactional-emails/{transactionalId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","minProperties":1,"description":"At least one field must be provided.","properties":{"name":{"type":"string","examples":["Password reset email"],"key$":"name"},"transactionalGroupId":{"type":"string","description":"The ID of the group to move this transactional email to.","examples":["clg7n5p3q1r9s7t5u3v1w9y7"],"key$":"transactionalGroupId"}},"additionalProperties":false,"x-ref":"#/components/schemas/UpdateTransactionalRequest","index$":1}}}},"parameters":[{"name":"transactionalId","in":"path","required":true,"description":"The ID of the transactional email.","schema":{"type":"string","examples":["cll42l54f20i1la0lfooe3z12"]},"index$":0}]},"POST /v1/transactional-emails":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The name of the transactional email.","examples":["Welcome email"],"key$":"name"},"transactionalGroupId":{"type":"string","description":"The ID of the group to add this transactional email to. Defaults to the team's Unsorted group when omitted.","examples":["clg7n5p3q1r9s7t5u3v1w9y7"],"key$":"transactionalGroupId"}},"required":["name"],"additionalProperties":false,"x-ref":"#/components/schemas/CreateTransactionalRequest","index$":1}}}},"parameters":[]},"GET /v1/transactional-emails":{"protocol":"http","parameters":[{"name":"perPage","in":"query","required":false,"description":"How many results to return in each request. Must be between 10 and 50. Default is 20.","schema":{"type":"string"},"index$":0},{"name":"cursor","in":"query","required":false,"description":"A cursor to return a specific page of results. Cursors can be found from the `pagination.nextCursor` value in each response.","schema":{"type":"string"},"index$":1}]},"GET /v1/transactional-emails/{transactionalId}":{"protocol":"http","parameters":[{"name":"transactionalId","in":"path","required":true,"description":"The ID of the transactional email.","schema":{"type":"string","examples":["cll42l54f20i1la0lfooe3z12"]},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const transactional_resource_ref01_ent = client.TransactionalResource()
    let transactional_resource_ref01_data = setup.data.new.transactional_resource['transactional_resource_ref01']

    transactional_resource_ref01_data = (await transactional_resource_ref01_ent.create(transactional_resource_ref01_data)).data()
    assert(null != transactional_resource_ref01_data.id)


    // LIST
    const transactional_resource_ref01_match: any = {}

    const transactional_resource_ref01_list = (await transactional_resource_ref01_ent.list(transactional_resource_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(transactional_resource_ref01_list, { id: transactional_resource_ref01_data.id })))


    // LOAD
    const transactional_resource_ref01_match_dt0: any = {}
    transactional_resource_ref01_match_dt0.id = transactional_resource_ref01_data.id
    const transactional_resource_ref01_data_dt0 = (await transactional_resource_ref01_ent.load(transactional_resource_ref01_match_dt0)).data()
    assert(transactional_resource_ref01_data_dt0.id === transactional_resource_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/transactional_resource/TransactionalResourceTestData.json')

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
    ['transactional_resource01','transactional_resource02','transactional_resource03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_TRANSACTIONAL_RESOURCE_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_TRANSACTIONAL_RESOURCE_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_TRANSACTIONAL_RESOURCE_ENTID']
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
  
