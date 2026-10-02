

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


describe('EmailMessageGuardianEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LOOPS_TEST_LIVE=TRUE.
  afterEach(liveDelay('LOOPS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LoopsSDK.test()
    const ent = testsdk.EmailMessageGuardian()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LOOPS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'email_message_guardian.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"errors":{"a":true,"h":"Errors","n":"errors","r":true,"sh":"Validation errors.","t":"`$ARRAY`","key$":"errors","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"warnings":{"a":true,"h":"Warnings","n":"warnings","r":true,"sh":"Validation warnings.","t":"`$ARRAY`","key$":"warnings","index$":2}},"id":{"field":"id","name":"id"},"name":"email_message_guardian","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/email-messages/{emailMessageId}/guardian","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"emailMessageId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/email-messages/{emailMessageId}/guardian","q":{"exist":["id"]},"r":{"param":{"emailMessageId":"id"}},"s":[{"lit":"v1"},{"lit":"email-messages"},{"var":"id"},{"lit":"guardian"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"email_message_guardian","name__orig":"email_message_guardian","Name":"EmailMessageGuardian","name_":"email_message_guardian","name-":"email-message-guardian","NAME":"EMAIL_MESSAGE_GUARDIAN","index$":17}, {"active":true,"entity":"email_message_guardian","key$":"BasicEmailMessageGuardianFlow","kind":"basic","name":"BasicEmailMessageGuardianFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"email_message_guardian_ref01","srcdatavar":"email_message_guardian_ref01_data","suffix":"_dt0"},"m":{"id":"email_message_guardian01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-email_message_guardian_ref01"}}]}]}, 'EmailMessageGuardian', {"GET /v1/email-messages/{emailMessageId}/guardian":{"protocol":"http","parameters":[{"name":"emailMessageId","in":"path","required":true,"description":"The ID of the email message.","schema":{"type":"string","examples":["cle5f7g9h1i3j5k7l9m1n3p5"]},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let email_message_guardian_ref01_data = Object.values(setup.data.existing.email_message_guardian)[0] as any

    // LOAD
    const email_message_guardian_ref01_ent = client.EmailMessageGuardian()
    const email_message_guardian_ref01_match_dt0: any = {}
    email_message_guardian_ref01_match_dt0.id = email_message_guardian_ref01_data.id
    const email_message_guardian_ref01_data_dt0 = (await email_message_guardian_ref01_ent.load(email_message_guardian_ref01_match_dt0)).data()
    assert(email_message_guardian_ref01_data_dt0.id === email_message_guardian_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/email_message_guardian/EmailMessageGuardianTestData.json')

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
    ['email_message_guardian01','email_message_guardian02','email_message_guardian03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LOOPS_TEST_EMAIL_MESSAGE_GUARDIAN_ENTID': idmap,
    'LOOPS_TEST_LIVE': 'FALSE',
    'LOOPS_TEST_EXPLAIN': 'FALSE',
    'LOOPS_APIKEY': '',
  })

  idmap = env['LOOPS_TEST_EMAIL_MESSAGE_GUARDIAN_ENTID']

  const live = 'TRUE' === env.LOOPS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LOOPS_TEST_EMAIL_MESSAGE_GUARDIAN_ENTID']
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
  
