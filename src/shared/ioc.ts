import { glob } from 'glob';
import { container, type DependencyContainer } from 'tsyringe';

// Dynamic register ioc dependencies
const modules = glob.sync(`${__dirname}/../**/*.ioc.ts`);

for (const module of modules) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { register } = require(module) as { register: (container: DependencyContainer) => void };

    register(container);
}

export { container };