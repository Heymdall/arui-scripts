module.exports = {
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        '@semantic-release/github',
        '@semantic-release/npm',
        '@semantic-release/git',
    ],
    branches: [
        { name: 'master' },
        { name: '*', channel: 'beta', prerelease: true },
        { name: '*/*', channel: 'beta', prerelease: true },
    ],
    repositoryUrl: 'https://github.com/alfa-laboratory/arui-scripts',
};
