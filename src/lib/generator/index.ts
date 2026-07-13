import type { GeneratorOptions, GitHubRepoResult } from "./types";
import { composeProject } from "./composer";
import { publishToGitHub } from "./github-publisher";

export async function generateBoilerplate(
  options: GeneratorOptions,
): Promise<GitHubRepoResult> {
  const files = composeProject(options);
  const result = await publishToGitHub(options, files);
  return result;
}

export { type GeneratorOptions, type GitHubRepoResult } from "./types";
