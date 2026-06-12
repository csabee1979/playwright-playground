import { devices, type Project } from '@playwright/test';
import { getConfig } from '@config/index';

const testConfig = getConfig();

export const commonUseOptions = {
  ignoreHTTPSErrors: testConfig.ignoreHTTPSErrors ?? false,
  screenshot: testConfig.screenshot ?? 'off',
  browserName: testConfig.browserName ?? 'chromium',
  headless: testConfig.headless ?? true,
  actionTimeout: testConfig.actionTimeout ?? 10_000,
  navigationTimeout: testConfig.navigationTimeout ?? 15_000,
};

export const chromeLaunchOptions = {
  viewport: { width: 1920, height: 1080 },
  launchOptions: {
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--ignore-certificate-errors',
    ],
  },
};

export function APIProject(
  name: string,
  testMatch: string,
  apiUrl: string,
  useOptions?: object,
): Project {
  const project: Project = {
    name,
    testMatch: [testMatch],
    use: { apiUrl, ...useOptions },
  };

  return project;
}

function createE2EProject(
  name: string,
  testMatch: string,
  baseURL: string,
  useOptions: object,
  sequential: boolean,
): Project {
  const project: Project = {
    name,
    testMatch: [testMatch],
    use: { ...commonUseOptions, ...useOptions, baseURL },
  };

  if (sequential) {
    project.fullyParallel = false;
  }

  return project;
}

export function desktopChromeProject(
  name: string,
  testMatch: string,
  baseURL: string,
  useOptions?: object,
  sequential = false,
): Project {
  return createE2EProject(
    name,
    testMatch,
    baseURL,
    { ...devices['Desktop Chrome'], ...chromeLaunchOptions, ...useOptions },
    sequential,
  );
}

export function mobileProject(
  name: string,
  testMatch: string,
  baseURL: string,
  useOptions?: object,
  sequential = false,
): Project {
  return createE2EProject(
    name,
    testMatch,
    baseURL,
    { ...devices['iPhone 12 Pro Max'], ...useOptions },
    sequential,
  );
}

export function addProjectDependencies(deps: string[], projects: Project[]): Project[] {
  return projects.map((project) => {
    const originalDependencies = project.dependencies ?? [];
    const dependencies = [...originalDependencies, ...deps];
    if (new Set(dependencies).size < originalDependencies.length + deps.length) {
      throw new Error('duplicated dependency has been found');
    }
    return {
      ...project,
      dependencies,
    };
  });
}
