import fs from 'fs';
import path from 'path';

interface MemModule {
  name: string;
  path: string;
}

async function getModules(
  basePath: string,
  check: (fileName: string) => boolean,
): Promise<Array<MemModule>> {
  let modules: Array<MemModule> = [];
  const files = await fs.promises.readdir(basePath);

  for (const file of files) {
    const filePath = path.join(basePath, file);
    const fileName = file.split('.')[0];

    if (check(fileName)) {
      modules.push({ name: fileName, path: path.join(basePath, file) });
    }

    const stat = await fs.promises.stat(filePath);
    if (stat.isDirectory()) {
      const insideModules = await getModules(filePath, check);
      modules = [...modules, ...insideModules];
    }
  }

  return modules;
}

export default getModules;
