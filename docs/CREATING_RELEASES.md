# Creating Releases

## 1. Create a Release Branch and PR

The branch name should be `release/vX.X.X` where `X.X.X` is the target version.

Ideally, the PR will have one commit that bumps the version number in `package.json` to whatever `X.X.X` is.

In practice, you might also use this PR to make some _**very minor**_ changes, such as adding a script to `package.json`, fixing a typo in the `README`, etc.

See [PR #X](https://github.com/saurookadook/node-utils/pull/X) for an example.

## 2. Test Publishing

Before merging the PR, make sure that you can successfully publish the package.

TL;DR:

```bash
pnpm pkg:prepublish
pnpm pkg:publish
```

Full instructions can be found in the [**Publishing** section of the main `README`](/README.md#publishing).

## 3. Merge the PR

> ⚠️ **IMPORTANT**
>
> PRs in this repo are set up to automatically delete their head branches. After merging this release PR, it's important to restore the branch so that specific versions can always be easily found via git.

## 4. Create a Release in GitHub

### 4.1 Navigate to the 'Releases' Page

![Releases page link](/docs/assets/releases-page-link.png)

### 4.2 Draft a new Release

![Draft a new release](/docs/assets/draft-new-release.png)

### 4.3 Fill out the details

For consistency, I would suggest _**at least**_ the following convention:

- **Tag**: `vX.X.X`
- **Release title**: `Release vX.X.X`

_(Again, where `X.X.X` matches the version in the release.)_

For the description, I've experienced a wide variety of practices. Some people leave a summary of all of the PRs included in the release, others leave links to the PR commits, and some don't put anything. 🫠

At the end of the day, use your best judgement; if there's an important change that was made, it should probably be documented somehow in the release description, _even if it's just a link to the PR with that change_.

<figure>

![Filling out release details](/docs/assets/filling-out-release-details.png)

<figcaption><em>I got a little cheeky with this first one...</em> 😅</figcaption>
</figure>

### 4.4 Attach binaries to the Release

Most Node.js package managers have a `pack` command that can be used to do just this. For specifics on `pnpm`'s, see [`pnpm pack`](https://pnpm.io/cli/pack).

For convenience, there is a `pack:release` script in the `package.json` for this purpose.

```bash
pnpm pack:release
```

This will build a tarball of the package on your machine at `./build/node-utils-vX.X.X.tgz`. Once you find that file, simply add it to the release.

And finally...

### 4.5 Publish the Release

![Published release](/docs/assets/published-release.png)
