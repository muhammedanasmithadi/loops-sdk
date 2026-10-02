# Loops SDK: DX report

Built with the Voxgig SDK generator (`npm create @voxgig/sdkgen`) from the
vendor OpenAPI spec.

## Input

- Spec: `https://app.loops.so/openapi.json` (OpenAPI 3.1.0, v1.22.2)
- Paths: 46. Size: ~395K.
- Catalogue check: absent from `voxgig-sdk.csv` (637 rows, 0 hits for loops).
- Scaffold: `npm create @voxgig/sdkgen -- loops -d ./openapi.json -o
  ./loops-sdk -t ts -f test` on Node 24.
- Auth: `securitySchemes.apiKey = {type: http, scheme: bearer}`,
  server `https://app.loops.so/api`.

## Results

- `npm run generate`: pass. 37 entities emitted.
- `npx voxgig-sdkgen doctor`: exit 0, `.sdk matches the scaffold`.
- `ts` suite: 380 tests, 378 pass, 1 fail, 1 skipped.
- Failing: `email_message_guardian.list GET
  /v1/email-messages/{emailMessageId}/guardian`: `list read 0 records
  where the definition example holds 2` (`test/definition.test.ts`).
- License: MIT present at repo root.

## Findings

1. Contacts do not collapse. `POST /v1/contacts/create`, `PUT
   /v1/contacts/update`, `GET /v1/contacts/find`, `POST
   /v1/contacts/delete` produce 7 entities (`contact`,
   `contact_delete`, `contact_property`, `contact_property_success`,
   `contact_success`, `contact_suppression_remove`,
   `contact_suppression_status`) instead of one `contacts` entity with
   four operations. Evidence: `.sdk/model/entity/contact*.aontu` (7
   files) plus `generate-entity target:ts` log lines. Effect: SDK surface
   reads `contactDelete`, `contactProperty...` rather than uniform
   `contacts.create/load/update/remove`. CLI and MCP names inherit the
   split. Fix: model RPC contact routes under one entity, or upstream
   document the split as expected for RPC-style specs.

2. RPC verbs in paths. `POST /v1/contacts/create`, `POST
   /v1/contacts/delete`, `GET /v1/contacts/find`. Expected REST:
   `POST/DELETE /v1/contacts`, `GET /v1/contacts`. `POST .../delete`
   forfeits idempotency and cache semantics. The generator passes the
   shape through, so every language target carries the quirk.

3. Inconsistent update method. Campaigns update via `POST
   /v1/campaigns/{campaignId}` (`updateCampaign`) while contacts update
   via `PUT`. Same action, different method across tags. The generated SDK
   cannot present a uniform update convention.

4. No contact list or pagination. Only `GET /v1/contacts/find?email=&
   userId=` (single lookup). No `GET /v1/contacts` list, no
   `page/pageSize/sort`. The generator paging feature has nothing to
   bind to for the most important entity.

5. Error and auth surface undocumented in-spec. `create` declares
   `200,400,405,409`; `find` declares `200,400,405`. No `401`, no
   `429`, despite bearer auth and rate limits existing in practice.
   Retry and ratelimit features cannot be driven from the spec alone.
   Scheme is also misnamed: key `apiKey` with `type: http, scheme:
   bearer` reads as header or query key but behaves as bearer token.

6. Generator notes. OpenAPI 3.1.0 processed with no version warning
   (docs name OpenAPI 3 and Swagger 2). Two `require-missing` warnings
   at generate (`ReadmeFeatures_ts`, `AgentGuide_ts`) look benign but
   unexplained. The offline-test failure above (guardian list
   0 vs 2 records) points to a mock or definition mismatch to check
   in `sdkgen` test-data generation.

## Recommendations

- Keep RPC only for non-CRUD actions. Route CRUD through method plus
  resource URL. Never `POST .../delete`.
- Unify update on `PUT` or `PATCH /v1/{resource}/{id}` across all tags.
- Add `GET /v1/contacts` list with `page/pageSize/sortBy/sortOrder`.
- Declare `401` and `429` responses with schemas and document rate limits
  in the spec so generated retry and ratelimit support is real.
- Rename the security scheme to `bearerAuth` or document the bearer
  usage at the top of the reference.
- Generator: warn once when spec is 3.1.x vs 3.0, explain the two
  `require-missing` lines or silence them, and seed guardian-list
  fixtures so the default suite is green on first generate.

## Stopped short

- Only the `ts` target generated. `py` and `go` left unattempted.
- No live key test. Nothing in this repo requires a key to reproduce.
