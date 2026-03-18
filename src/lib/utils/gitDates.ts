import { execSync } from "node:child_process";

export function getGitDates(filePath: string) {
  try {
    const created = execSync(
      `git log --diff-filter=A --follow --format=%aI -1 -- "${filePath}"`
    )
      .toString()
      .trim()
      .split("T")[0];

    const updated = execSync(
      `git log -1 --format=%aI -- "${filePath}"`
    )
      .toString()
      .trim()
      .split("T")[0];

    return {
      datePublished: created,
      dateModified: updated,
    };
  } catch {
    return {
      datePublished: "",
      dateModified: "",
    };
  }
}
