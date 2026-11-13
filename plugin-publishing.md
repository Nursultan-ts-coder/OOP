Your project already covers steps 1–3 of Grafana's instructions: the ID is `mcd-oop-app` and the build works. I've wrapped steps 5–6 into one command.

**What you do:**

1. Create the token on grafana.com: My Account → Security → Access Policies, realm `mcd (all-stacks)`, scope `plugins:write`.
2. In the project folder, run:

```bash
export GRAFANA_ACCESS_POLICY_TOKEN=<your-token>
npm run package:private
```

This builds the frontend and every backend, signs a copy privately for `https://mcdobservability.grafana.net`, and writes `release/mcd-oop-app-1.0.0.zip` plus its SHA1. Your `dist` stays unsigned, so local Grafana keeps working. `release/` is git-ignored, and the token is never saved anywhere. 3. On grafana.com, go to Org Settings → My Plugins → Submit New Plugin, and say it's private for your org.

Step 7 is the real gate. Even signed, the zip can't be uploaded to your Cloud stack yourself, so whether it ends up on Cloud is Grafana's decision after review. While you wait, a public README isn't needed. Ask them for anything the form requires.
