## Code Quality, Git Hooks, and Pull Requests

This project uses pre-commit hooks to ensure consistent code style, readability, and maintainability. All checks use existing tools without custom validators.

### 1. One-Time Setup

**Prerequisites:** Git, Python 3.12, Node.js 22.22.0+ (or Node.js 24), and npm.

#### Step 1: Install pre-commit

From the project root, install pre-commit into a project-local virtual environment:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
export PRE_COMMIT_HOME="$PWD/.cache/pre-commit"
python -m pip install 'pre-commit>=4.0,<5'
```

This `.venv` is ignored by Git and is separate from the inactive backend environment. No global Python package installation is needed. In a new terminal, activate it again with `source .venv/bin/activate`, or call `.venv/bin/pre-commit` directly. Set `PRE_COMMIT_HOME` again from the project root to keep hook environments and caches in the ignored project `.cache/` directory. Pre-commit creates separate virtual environments for its Python hooks; without this variable it uses its default user cache.

#### Step 2: Install frontend dependencies

From the project root:

```bash
npm ci --prefix frontend
```

Prettier and the JSDoc plugin are declared in `frontend/package.json` and pinned by the lockfile. ESLint and the TypeScript rules are supplied by the existing frontend setup. Packages stay in `frontend/node_modules`; no global npm installation is required. Commit both dependency files when changing dependencies.

Configuration filenames are `.pre-commit-config.yaml`, `.pylintrc`, `frontend/.prettierrc.json`, and `ruff.toml`. `pylintrc` is also a valid Pylint filename, but this repository explicitly uses `--rcfile=.pylintrc`.

#### Step 3: Enable Git hooks

From the project root:

```bash
pre-commit install --hook-type pre-commit --hook-type commit-msg
```

Run this step only when you are ready to enable automatic checks. Updating configuration or installing dependencies alone does not enable Git hooks. This command installs two Git hooks:

- `pre-commit`: Runs code formatting, linting, and validation checks before each commit.
- `commit-msg`: Validates the commit message format.

These hooks apply only to this Git repository.

#### Step 4: Verify setup

First validate the hook configuration without running formatters:

```bash
pre-commit validate-config .pre-commit-config.yaml
npm --prefix frontend run lint
frontend/node_modules/.bin/prettier --check frontend/src frontend/tests
```

These checks do not rewrite source files. Existing source files may fail the new naming, documentation, numeric-literal, or formatting rules. A working hook setup does not mean the existing application already complies.

When source changes are approved, run all hooks:

```bash
pre-commit run --all-files
```

This command can rewrite tracked files through Ruff, Prettier, whitespace cleanup, and newline cleanup. It also checks the preserved backend drafts; do not run it on those drafts until their modification is approved. Review every change before staging it. Neither Git hook installation nor a full automatic-formatting pass is part of the configuration-only update.

The ESLint hook runs the full frontend lint script once whenever matching frontend code is staged. It uses `frontend/` as its working directory, just like a manual `npm run lint` there. This includes existing frontend files, not only the staged files. Build output, generated API types, Playwright output, and downloaded browser files are excluded.

### 2. Code Style Requirements

| Tool | Requirements |
|---|---|
| Ruff | Format Python code, sort imports, remove unused imports, and detect magic numbers in comparisons |
| Pylint | Use camelCase for Python functions/methods and provide nonempty docstrings |
| Prettier | Automatically format frontend code |
| ESLint | Enforce camelCase function names, detect unused variables, and check magic numbers |
| eslint-plugin-jsdoc | Require descriptive JSDoc comments for named frontend functions |
| conventional-pre-commit | Enforce Conventional Commit messages |
| pre-commit-hooks | Check whitespace, EOF newlines, merge conflicts, JSON/YAML validity, large files, and private keys |

**Naming and documentation exceptions:**

- Python test functions, special methods (`__init__`, etc.), and framework-required names are exempt where appropriate.
- React components may use PascalCase.
- Frontend `*.test.*`, `*.spec.*`, and `__tests__/` files are exempt from missing-JSDoc checks, including JavaScript and TypeScript module extensions. Other lint rules still apply to tests.
- Common numeric literals such as `0`, `1`, and `2` are allowed.

Example Python function:

```python
def calculateTotal(price: float, quantity: int) -> float:
    """Calculate the total price for a given quantity."""
    return price * quantity
```

Example TypeScript function:

```typescript
/**
 * Calculates the total price for a given quantity.
 */
function calculateTotal(price: number, quantity: number): number {
  return price * quantity;
}
```

### 3. Commit Message Requirements

All commit messages must follow the Conventional Commits format:

```text
<type>: <description>
```

Supported examples:

```text
feat: add appointment booking
fix: handle empty API responses
refactor: simplify conversation logic
chore: update dependencies
docs: update README
test: add booking validation tests
```

A commit with an invalid message will be rejected.

### 4. Everyday Git Workflow

#### Step 1: Create a feature branch

```bash
git switch main
git pull --ff-only
git switch -c feat/my-feature
```

#### Step 2: Make changes and test locally

Write code following the style requirements above.

Optionally run all hooks before committing, once automatic formatting and any required source changes are approved:

```bash
pre-commit run --all-files
```

#### Step 3: Commit changes

```bash
git add .
git commit -m "feat: add new feature"
```

Pre-commit hooks run automatically.

- Formatting issues are fixed automatically where supported.
- Other violations block the commit and display error messages.
- If files are automatically modified, review and stage them again:

```bash
git add .
git commit -m "feat: add new feature"
```

#### Step 4: Push and open a Pull Request

```bash
git push -u origin feat/my-feature
```

Open a Pull Request targeting `main` on GitHub.

Before submitting, complete the PR checklist:

- Code is readable and maintainable.
- Changes do not conflict with existing functionality.
- No merge conflicts remain.
- Local tests and pre-commit checks pass.

### 5. GitHub Actions

GitHub Actions automatically runs pre-commit checks on every Pull Request targeting `main`.

The workflow:

- Runs the same checks as local development.
- Validates commit messages.
- Reports violations without modifying the submitted files.
- Fails when required checks do not pass.

Enable branch protection for `main` and require the GitHub Actions check to pass before merging.

### 6. Notes and Limitations

- Pre-commit is installed in the root `.venv`, independently of the backend Python virtual environment.
- Ruff, Pylint, and Conventional Commit hooks use isolated environments managed by pre-commit.
- ESLint and Prettier use dependencies installed in `frontend/node_modules`.
- The backend application dependencies remain in the backend virtual environment.
- Hooks can be bypassed locally, so GitHub Actions should be used as an additional safeguard.
- JSDoc rules can require comments but cannot guarantee that descriptions are genuinely meaningful.
- Framework conventions and generated code may require narrowly scoped lint exceptions.
- Automatically formatted files must be staged again before committing.
- Merge the provided ESLint and Ruff settings with existing project-specific configurations rather than replacing them blindly.
