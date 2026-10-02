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
- `ts` suite: 380 tests, 379 pass, 0 fail, 1 skipped.
- License: MIT present at repo root.

## Findings

1. Contacts do not collapse. `POST /v1/contacts/create`, `PUT
   /v1/contacts/update`, `GET /v1/contacts/find`, `POST
   /v1/contacts/delete` produce 7 entities (`contact`,
   `contact_delete`, `contact_property`, `contact_property_success`,
   `contact_success`, `contact_suppression_remove`,
   `contact_suppression_status`) instead of one `contacts` entity with
   four operations. The evidence sits in `.sdk/model/entity/contact*.aontu`
   (7 files) and the `generate-entity target:ts` log lines. The SDK surface
   reads `contactDelete` and `contactProperty...` rather than a uniform
   `contacts.create/load/update/remove`. CLI and MCP names inherit the
   split. The fix belongs in the model: fold RPC contact routes under one
   entity, or document the split upstream as expected behavior for
   RPC-style specs.

2. HTTP methods misuse their meaning. Three contact routes carry verbs in
   the URL (`POST /v1/contacts/create`, `POST /v1/contacts/delete`,
   `GET /v1/contacts/find`) instead of letting the method speak
   (`POST` and `DELETE /v1/contacts`, `GET /v1/contacts`). `POST .../delete`
   gives up idempotency and cache semantics that `DELETE` carries for free.
   Campaigns add a second inconsistency: update runs through `POST
   /v1/campaigns/{campaignId}` while contacts update through `PUT`. Same
   action, different method, different tags. The generator passes both
   shapes through untouched, so every language target ships the quirks.

3. No contact list exists. The only read is `GET /v1/contacts/find?email=&
   userId=`, a single lookup. No `GET /v1/contacts` list, no
   `page/pageSize/sort`. The generator paging feature has nothing to bind
   to for the most important entity in the API.

4. Error and auth surface stay undocumented in the spec. `create` declares
   `200,400,405,409` and `find` declares `200,400,405`. Neither lists `401`
   or `429`, though bearer auth and rate limits apply in practice. Retry and
   ratelimit features cannot be driven from the spec alone. The scheme name
   misleads on top of that: key `apiKey` with `type: http, scheme: bearer`
   reads as a header or query key but behaves as a bearer token.

5. Pagination differs per list. Ten of thirteen list operations take `cursor`
   plus `perPage`. `GET /v1/lists` and `GET /v1/dedicated-sending-ips` take
   no parameters. `GET /v1/contacts/properties` takes a single `list`
   parameter. A generated paging helper cannot cover all three shapes, so
   callers learn each list separately. One convention across lists would
   remove the problem.

6. The `group` entity merges two resources. `POST
   /v1/campaign-groups/{campaignGroupId}` and `POST
   /v1/transactional-groups/{transactionalGroupId}` both become
   `group.create`, and both GETs become `group.load`. Campaign groups and
   transactional groups serve different purposes. Sharing one entity invites
   callers to pass the wrong id. `email_metric.load` repeats the pattern:
   workflow-node metrics and campaign metrics land in a single operation.
   Distinct resources need distinct entities.

7. Generator notes. OpenAPI 3.1.0 processes with no version warning, though
   the docs name OpenAPI 3 and Swagger 2. Two `require-missing` warnings
   appear at generate (`ReadmeFeatures_ts`, `AgentGuide_ts`). They look
   benign but nothing explains them. One classification error surfaced in
   the first suite run and is fixed in this repo: `GET .../guardian`
   returns a singleton status object with `errors` and `warnings`, yet the
   model first typed it as `list`, so the mock served 0 records against an
   example holding 2. A guide override in `.sdk/model/guide/guide.aontu`
   retypes it as `load` (`op: list: active: *false`, `op: load: method:
   *GET`), following ADR-002, and the suite passes since. Upstream could
   type singleton sub-resources as `load` by default.

## Recommendations

- Keep RPC only for non-CRUD actions. Route CRUD through method plus
  resource URL. Never `POST .../delete`.
- Unify update on `PUT` or `PATCH /v1/{resource}/{id}` across all tags.
- Add `GET /v1/contacts` list with `page/pageSize/sortBy/sortOrder`.
- Give every list the same pagination parameters.
- Keep campaign groups and transactional groups in separate entities.
- Declare `401` and `429` responses with schemas and document rate limits
  in the spec so generated retry and ratelimit support is real.
- Rename the security scheme to `bearerAuth` or document bearer usage at
  the top of the reference.
- Generator: warn once when the spec is 3.1.x vs 3.0, explain the two
  `require-missing` lines or silence them, type singleton sub-resources as
  `load`, and seed guardian-list fixtures so the default suite passes on
  first generate.

## Stopped short

- Only the `ts` target generated. `py` and `go` left unattempted.
- No live key test. Nothing in this repo requires a key to reproduce.
