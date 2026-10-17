# Assignment 5: Git and GitHub

## Repository

https://github.com/Soham-patel0/vsec-labs

## Commands

```powershell
git clone https://github.com/Soham-patel0/vsec-labs.git
cd vsec-labs
git status
git remote -v
git log --oneline
```

After editing a file:

```powershell
git add <file>
git diff --cached
git commit -m "Update assignment"
git push origin main
```

Git tracks local changes. The staging area selects changes for a commit. Commits record project history, and push publishes commits to the remote repository. The remote is named origin and the primary branch is main.
