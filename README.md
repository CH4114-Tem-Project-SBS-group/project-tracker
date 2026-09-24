<div align="center">

# CH4114 · Project Tracker

**Public tracker and problem-statement registry for the CH4114 SBS group.**

![Astro](https://img.shields.io/badge/Astro-7-FF5D01?style=flat-square&logo=astro&logoColor=white)
![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-222?style=flat-square&logo=github)
![Projects](https://img.shields.io/badge/projects-9-7c3aed?style=flat-square)

</div>

A small [Astro](https://astro.build) site that indexes every project in the group:
browse the register, read all consolidated problem statements in one place, open each
project's private repository, and follow commit activity.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Searchable, filterable grid of all nine projects |
| `/projects/<slug>/` | Full project page: overview, objectives, analysis, software, challenge, problem statement |
| `/statements/` | Every consolidated problem statement, with an index |
| `/activity/` | Curated register changelog + per-project commit activity |

## Local development

```bash
npm install
npm run dev      # http://localhost:4321/project-tracker/
npm run build    # static output in dist/
npm run preview  # preview the production build
```

## Editing project data

All project content lives in [`src/data/projects.ts`](src/data/projects.ts). It is
generated from the canonical register; update the register and regenerate rather than
hand-editing where possible.

## Updating activity

Commit activity is synced from the **private** project repositories by a maintainer.
The site is public, so the sync records **only dates and counts** — never commit
messages, authors or diffs.

```bash
gh auth status          # must have access to the org's private repos
npm run sync:activity   # writes src/data/activity.json
```

Curated, human-readable milestones go in [`src/data/updates.ts`](src/data/updates.ts).

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes it to GitHub Pages:

`https://ch4114-tem-project-sbs-group.github.io/project-tracker/`

## Access model

- This tracker repository is **public** (maintained by the group maintainer).
- The nine project repositories are **private** and **view-only** for members.
- Members can read and clone every project but cannot push to another member's repo.
