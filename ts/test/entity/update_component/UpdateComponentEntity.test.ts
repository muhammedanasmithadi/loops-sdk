

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


describe('UpdateComponentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.UpdateComponent()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'update_component.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"lmx":{"a":true,"h":"Lmx","n":"lmx","r":false,"sh":"The component body as an LMX string.","t":"`$STRING`","key$":"lmx","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"t":"`$STRING`","key$":"name","index$":2}},"id":{"field":"id","name":"id"},"name":"update_component","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/components/{componentId}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"componentId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/components/{componentId}","q":{"exist":["id"]},"r":{"param":{"componentId":"id"}},"s":[{"lit":"v1"},{"lit":"components"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"update_component","name__orig":"update_component","Name":"UpdateComponent","name_":"update_component","name-":"update-component","NAME":"UPDATE_COMPONENT","index$":30}, {"active":true,"entity":"update_component","key$":"BasicUpdateComponentFlow","kind":"basic","name":"BasicUpdateComponentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"update_component_ref01"},"m":{"component_id":"component01"},"o":"create","s":[],"v":[]}]}, 'UpdateComponent', {"POST /v1/components/{componentId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"At least one of `name` or `lmx` must be provided.","properties":{"name":{"type":"string","key$":"name"},"lmx":{"type":"string","description":"The component body as an LMX string.","key$":"lmx"}},"x-ref":"#/components/schemas/UpdateComponentBody","index$":1}}}},"parameters":[{"name":"componentId","in":"path","required":true,"description":"The ID of the component.","schema":{"type":"string","examples":["clp2o4i6u8y0t5r3e1w7q9s1"]},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const update_component_ref01_ent = client.UpdateComponent()
    let update_component_ref01_data = setup.data.new.update_component['update_component_ref01']
    update_component_ref01_data['component_id'] = setup.idmap['component01']

    update_component_ref01_data = (await update_component_ref01_ent.create(update_component_ref01_data)).data()
    assert(null != update_component_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/update_component/UpdateComponentTestData.json')

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
    ['update_component01','update_component02','update_component03','component01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_UPDATE_COMPONENT_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_UPDATE_COMPONENT_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_UPDATE_COMPONENT_ENTID']
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
  
