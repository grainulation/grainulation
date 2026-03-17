# /batch -- Apply a Change Across Multiple Grainulation Repos

You are running a batch operation across the grainulation ecosystem. The change description is: $ARGUMENTS

## Ecosystem repos

Use the ecosystem registry to enumerate tools. Run this to get the canonical list:

```
node -e "const e = require('./lib/ecosystem'); console.log(JSON.stringify(e.getAll().map(t => ({name: t.name, port: t.port}))))"
```

If that fails (not running from the grainulation repo root), use the known tool list:

| Repo | Port |
|------|------|
| farmer | 9090 |
| wheat | 9091 |
| barn | 9093 |
| mill | 9094 |
| silo | 9095 |
| harvest | 9096 |
| orchard | 9097 |
| grainulation | 9098 |

All repos live as siblings under the same parent directory. Detect the root by checking `../farmer`, `../wheat`, etc. relative to CWD, or use `$HOME/repo/grainulation/` as fallback.

## Procedure

### Step 1: Survey all repos

For each repo, check:
- `git status` -- is the working tree clean? Flag dirty repos.
- `npm test` -- do tests currently pass? Flag failing repos.
- Is the change relevant to this repo? Some changes may not apply to all 8.

Print a survey table:

```
Repo          Clean?  Tests?  Applicable?
farmer        yes     pass    yes
wheat         yes     pass    yes
...
```

### Step 2: Present the plan

Tell the user exactly what you plan to do in each applicable repo. Include:
- Which files will be modified/created
- What the change looks like
- Which repos will be skipped and why

Ask for confirmation before proceeding.

### Step 3: Execute in parallel using worktree isolation

For each applicable repo, launch a parallel Agent with `isolation: "worktree"`:
- Enter the worktree
- Apply the change
- Run `npm test`
- If tests pass, commit with message: `batch: <change summary>`
- If tests fail, report the failure -- do NOT commit

Collect results from all agents.

### Step 4: Report results

Print a results matrix:

```
Repo          Applied?  Tests?  Committed?  Notes
farmer        yes       pass    yes
wheat         yes       pass    yes
harvest       yes       FAIL    no          [error details]
...
```

### Step 5: Handle failures

If any repos failed:
- Show the error for each
- Offer options: retry individually, skip, or roll back all changes

### Step 6: Notify farmer

If farmer is running (probe localhost:9090/health), send a notification:
```
curl -s -X POST http://127.0.0.1:9090/hooks/notification -H 'Content-Type: application/json' -d '{"message":"batch complete: <summary>"}' 2>/dev/null || true
```

## Rules

- NEVER force-push or use destructive git commands
- NEVER apply changes to dirty repos without user confirmation
- If a repo has no tests (`npm test` not configured), note it but proceed
- Commit messages always start with `batch:` prefix
- Report ALL results, including skipped repos
