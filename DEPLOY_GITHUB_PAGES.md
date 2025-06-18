# Instructions for GitHub Pages deployment

1. Replace `your-username` and `your-repo-name` in the homepage URL below with your actual GitHub username and repository name.
2. After editing, run:
   npm install gh-pages --save-dev
   npm run deploy

---

- homepage: https://dave02233.github.io/Tarocchi
- Add scripts:
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
