module.exports = {
    findOrCreate(options, cb) {
        console.log(`Find or create ${options.githubId}`);
        cb(null, options);
    },
    getByGitHubId(githubId, cb) {
        console.log(`Get by id ${githubId}`);
        cb(null, { githubId });
    }
};