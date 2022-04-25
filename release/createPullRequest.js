const { debug } = require('./util/logging')
const parseChangelog = require('changelog-parser')
const { GITHUB_ACTOR, RELEASE_VERSION, GITHUB_REF } = process.env

module.exports = async (github, context) => {
  const changelogData = await parseChangelog('CHANGELOG.md')
  const entry = changelogData.versions.find(
    (i) => i.version === RELEASE_VERSION
  )

  const body = [
    `## ${entry.title}\n`,
    entry.body,
    '\n----\n',
    '# Release steps:',
    "> The crowd manual regression test cycle can be skipped when it's a alpha / beta release or when the release doesn't have any noteworthy changes.",
    '- [x] 1) Create a release branch and update files',
    '- [ ] 2) Check changes and pass all tests',
    '- [ ] 3) Publish the `rc` release',
    '- [ ] 4) Start the crowd manual regression testing cycle',
    '- [ ] 5) Finish the crowd manual regression testing cycle',
    '- [ ] 6) Update release with full version number',
    '- [ ] 7) Release full version',
    '- [ ] 8) Notify people on slack (#team-sdk-web)',
  ].join('\n')

  const { repo, owner } = context.repo

  const reviewers = [
    'DannyvanderJagt',
    'Phoebe-B',
    'zoeradkani',
    'it-ony',
    'nulrich',
  ].filter((s) => s.toLowerCase() !== GITHUB_ACTOR.toLowerCase())

  debug('Creating PR')
  const result = await github.rest.pulls.create({
    title: RELEASE_BRANCH_NAME,
    owner,
    repo,
    head: GITHUB_REF,
    base: 'master',
    body,
  })

  debug('Adding reviewers')
  await github.rest.pulls.requestReviewers({
    owner,
    repo,
    pull_number: result.data.number,
    reviewers,
  })

  debug('Adding labels')
  github.rest.issues.addLabels({
    owner,
    repo,
    issue_number: result.data.number,
    labels: ['release'],
  })
}
