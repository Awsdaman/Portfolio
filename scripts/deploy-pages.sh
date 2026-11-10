#!/usr/bin/env bash
# Builds both websites and publishes them to the gh-pages branch.
#   https://awsdaman.github.io/Portfolio/          full portfolio, with /games/
#   https://awsdaman.github.io/Portfolio/bootcamp/ games version on its own
set -euo pipefail
cd "$(dirname "$0")/.."

export SITE_DOMAIN=awsdaman.github.io
export VITE_CSP_META=1

npx tsc --noEmit

VITE_SITE=games VITE_BASE=Portfolio/bootcamp/ npx vite build
mv dist .pages-bootcamp

VITE_BASE=Portfolio/ npx vite build
mv .pages-bootcamp dist/bootcamp
touch dist/.nojekyll

remote="$(git remote get-url origin)"
site="$PWD/dist"
work="$(mktemp -d)"

if git ls-remote --exit-code "$remote" gh-pages >/dev/null; then
  git clone -q --branch gh-pages --depth 1 "$remote" "$work"
else
  git -C "$work" init -q -b gh-pages
  git -C "$work" remote add origin "$remote"
fi

git -C "$work" rm -rq --ignore-unmatch .
cp -r "$site/." "$work/"
git -C "$work" add -A

if git -C "$work" diff --cached --quiet; then
  echo "Nothing changed, so nothing was published."
else
  git -C "$work" commit -q -m "Publish site"
  git -C "$work" push -q origin gh-pages
  echo "Published."
fi
