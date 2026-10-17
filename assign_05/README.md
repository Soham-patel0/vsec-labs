# Assignment 5: Local Git and GitHub practical

## Run

Follow the Windows terminal steps below. This practical requires your own command execution.

## Viva: explain the implementation

1. Git tracks local history; GitHub hosts a remote copy. git add stages a change, git commit records it locally, git push sends commits to the remote.

2. origin is a remote nickname; main is a branch. git status shows worktree/staging state, while git log shows commit history.

3. Screenshots and transcripts must come from your own terminal. Assistant-generated commits do not prove you performed the practical.

## Demonstration checklist

Capture the local repository, remote URL, your commit, push result and resulting GitHub file. Explain the staging area.

## Windows PowerShell: genuine local evidence

Use VS Code's terminal in YOUR repository folder. If the repository already has Git history, do not reinitialize or overwrite it. After these assignments are published, clone the repository into a fresh folder if needed:

```powershell
git clone https://github.com/Soham-patel0/vsec-labs.git
cd vsec-labs
git status
git remote -v
```

If your instructor specifically requires `git init`, create a separate practice folder and a NEW empty GitHub repository in your account. Do not use the existing assignments remote for an unrelated initial history:

```powershell
mkdir vsec-git-practice
cd vsec-git-practice
git init -b main
# Replace the URL below with the new empty practice repository's HTTPS URL.
git remote add origin https://github.com/YOUR-USERNAME/YOUR-NEW-PRACTICE-REPO.git
git remote -v
```

In either workflow, create a short text file in VS Code called `git-practical.txt` describing what you learned. Then run:

```powershell
git status
git add git-practical.txt
git diff --cached
git commit -m "Complete my local Git practical"
git log -1 --oneline
git push -u origin main
git status
```

If Git requests identity, set your own real name and email using repository-local `git config user.name` and `git config user.email`. Authenticate through Git's browser flow; never paste a token into a command, screenshot, README or remote URL. If a push is rejected, inspect the remote and history; do not force-push.

Capture terminal screenshots or a transcript of YOUR commands and outputs, plus the uploaded file on GitHub. Save evidence privately in `evidence/`; it is ignored by Git by default. No evidence has been fabricated or supplied.
